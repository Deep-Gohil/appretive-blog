const { Router } = require("express");
const { addComment, getAllComments, getCommentsByBlogId } = require("../controllers/comments.controller");
const isAdmin = require("../middlewares/isAdmin");

const commentRouter = Router();

commentRouter.get("/all",getAllComments);
commentRouter.get("/:blog",getCommentsByBlogId);

commentRouter.post("/add/:blog",isAdmin,addComment);

module.exports = commentRouter;