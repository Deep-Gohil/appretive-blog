const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const OTP = require("../models/otp.model");
const sendMail = require("../services/sendMail");

const Signup = async (req, res) => {
    try {
        const { username, number, role, email, password } = req.body;

        if (!username || !number || !email || !password) {
            return res.status(400).json({
                message: "Please provide all the required fields",
                success: false
            });
        };

        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: username,
            number: number,
            role: role,
            email: email,
            password: hashedPassword
        });

        const token = JWT.sign({
            id: newUser._id,
            username: newUser.username,
            number: newUser.number,
            role: newUser.role,
            email: newUser.email,
        }, process.env.JWT_SECRET);

        return res.status(201).json({
            message: "Signup Successfull",
            success: true,
            user: {
                id: newUser._id,
                username: newUser.username,
                role: newUser.role,
                email: newUser.email,
            },
            token
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    };
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide all the required fields",
                success: false
            });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password",
                success: false
            });
        };

        const token = JWT.sign({
            id: user._id,
            username: user.username,
            number: user.number,
            role: user.role,
            email: user.email,
        }, process.env.JWT_SECRET);

        return res.status(200).json({
            message: "Login successful",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
                email: user.email,
            },
            token
        });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    };
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "User Fetched Successfully", success: true, users });
    } catch (error) {
        return res.json({ message: error.message, success: false })
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({ message: "User not exist" });
        }
        return res.status(200).json({ message: "User Fetched Successfully", user });
    } catch (error) {
        return res.json({ message: error.message, success: false })
    }
};

const imageUpload = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded", success: false });
        }

        const imagePath = req.file.path;

        const user = await User.findByIdAndUpdate(
            id,
            { image: imagePath },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        return res.status(200).json({
            message: "Image uploaded successfully",
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndUpdate(id, req.body);
        return res.status(201).json({ message: "User Updated!", success: true, new: true, user });
    } catch (error) {
        return res.json({ message: error.message, success: false })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        return res.status(201).json({ message: "User deleted!", success: true, user });
    } catch (error) {
        return res.json({ message: error.message, success: false })
    }

};

const sendOtp = async (req, res) => {
    try {
        const { email } = req.params;

        const otp = Math.floor(1000 + Math.random() * 9000);

        await OTP.findOneAndUpdate(
            { email },
            { email, otp },
            { upsert: true, new: true }
        );

        const html = `<h1>Hello,</h1>
            <p>Your OTP is: <b>${otp}</b></p>
            <p>Enter this OTP to verify your email.</p>`;

        await sendMail(email, "Your OTP Code", html);

        return res.status(200).json({
            message: "OTP sent to email",
            success: true,
            email
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { email } = req.params;
        const { otp } = req.body;

        // console.log("otp from user", otp);
        const storedOtp = await OTP.findOne({ email });

        if (!storedOtp) {
            return res.status(400).json({ message: "OTP expired or not found", success: false });
        }

        if (storedOtp.otp !== parseInt(otp)) {
            return res.status(400).json({ message: "Invalid OTP", success: false });
        }

        await OTP.deleteOne({ email });

        let user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        user = await User.findByIdAndUpdate(
            user._id,
            { role: "admin" },
            { new: true }
        );

        const token = JWT.sign({
            id: user._id,
            username: user.username,
            number: user.number,
            role: user.role,
            email: user.email,
            image:user.image
        }, process.env.JWT_SECRET);

        return res.status(200).json({
            message: "OTP verified successfully, user role updated to admin",
            success: true,
            user,
            token
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

module.exports = { Signup, Login, getAllUsers, getUserById, updateUser, deleteUser, imageUpload, sendOtp, verifyOtp };