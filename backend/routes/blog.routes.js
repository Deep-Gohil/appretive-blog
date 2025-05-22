const { Router } = require("express");
const { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require("../controllers/blog.controller");
const isAdmin = require("../middlewares/isAdmin");

const blogRoutes = Router();

blogRoutes.get("/all",getAllBlogs);
blogRoutes.get("/:id",getBlogById);

blogRoutes.post("/create",isAdmin,createBlog);

blogRoutes.patch("/update/:id",updateBlog);

blogRoutes.delete("/delete/:id",deleteBlog);

module.exports = blogRoutes;