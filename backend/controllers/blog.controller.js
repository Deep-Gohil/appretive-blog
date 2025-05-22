const Blog = require("../models/blog.model");

const createBlog = async (req, res) => {
    try {
        const { title, description } = req.body;
        let createdBy = req.user.id

        if (!title || !description || !createdBy) {
            return res.status(400).json({ message: "Please fill all required filds" });
        }
        const blog = await Blog.create({
            title,
            description,
            createdBy
        });

        return res.status(201).json({ message: "Blog created successfully", success: true, blog });
    } catch (error) {
        return res.json({ message: error.message, success: false });
    }
}

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("createdBy","id email username number image").populate("comments","text createdBy blog");
        return res.status(200).json({ message: "Successfully fetched blogs", success: true, blogs });
    } catch (error) {
        return res.json({ message: error.message, success: false });
    }
}

const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id).populate("createdBy","id email username number");

        if (!blog) {
            return res.status(400).json({ message: "No blog found", success: false });
        }

        return res.status(200).json({ message: "Blog fetched successfully", success: true, blog });
    } catch (error) {
        return res.json({ message: error.message, success: false })
    }
}

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndUpdate(id, req.body);

        if (!blog) {
            return res.status(404).json({ message: "Blog not exists", success: false });
        }

        return res.status(200).json({ message: "Blog updated successfully", success: true });
    } catch (error) {
        return res.json({ message: error.message, success: false });
    }
}

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params
        await Blog.findByIdAndDelete(id);
        return res.status(200).json({ message: "Blog deleted successfully", success: true });
        
    } catch (error) {
        return res.json({ message: error.message, success: false })
    }
}

module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };