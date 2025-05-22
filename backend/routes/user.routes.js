const { Router } = require("express");
const { getAllUsers, getUserById, Signup, Login, updateUser, deleteUser, imageUpload, sendOtp, verifyOtp } = require("../controllers/user.controller");
const upload = require("../utils/imageUpload");

const userRouter = Router();

userRouter.get("/all",getAllUsers);
userRouter.get("/:id",getUserById);

userRouter.post("/signup",Signup);
userRouter.post("/login",Login);
userRouter.post("/send-otp/:email",sendOtp);
userRouter.post("/verify-otp/:email",verifyOtp);

userRouter.patch("/update/:id",updateUser);
userRouter.patch("/image-upload/:id",upload.single("image"),imageUpload);

userRouter.delete("/delete/:id",deleteUser);

module.exports = userRouter;