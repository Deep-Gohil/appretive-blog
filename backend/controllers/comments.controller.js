const Comments = require("../models/Comments.model");

const addComment = async (req, res) => {
    try {
        const createdBy = req.user.id;
        const { blog } = req.params;
        const {text} = req.body;

        // console.log("createdBy",req.user);

        if (!text) {
            return res.status(400).json({ message: "Please enter any comment", success: false });
        }

        const comments = await Comments.create({
            text: text,
            createdBy: createdBy,
            blog: blog
        });

        return res.status(201).json({ message: "Comment Added!", success: true, comments });
    } catch (error) {
        return res.status(400).json({ message: error.message, success: false });
    }
}

const getAllComments = async (req, res) => {
    try {
        const comments = await Comments.find();
        return res.status(200).json({ message: "All comments fetched successfully", success: true, comments });
    } catch (error) {
        return res.status(400).json({ message: error.message, success: false });
    }
}

const getCommentsByBlogId = async (req, res) => {
    try {
        let { blog } = req.params;
        let comments = await Comments.find({blog:blog});
        return res.status(200).json({message:"All comments fetched!",success:true,comments});
    } catch (error) {
        return res.status(404).json({message:error.message,success:false});
    }
}

module.exports = {addComment,getCommentsByBlogId,getAllComments}