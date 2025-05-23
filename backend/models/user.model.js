const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:""
    },
    number:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const User = mongoose.model("User",userSchema);
module.exports = User;