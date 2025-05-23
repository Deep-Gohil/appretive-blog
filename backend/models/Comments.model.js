const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const Comments = mongoose.model("Comments",commentSchema);
module.exports = Comments;