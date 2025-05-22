const mongoose = require("mongoose");

const connectToDatabase = async()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected To Database!");
    }catch(error){
        console.log("error ",error);
    }
}

module.exports = connectToDatabase;