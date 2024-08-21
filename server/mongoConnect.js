require('dotenv').config();
const mongoose = require('mongoose');
const URI = process.env.MONGODB_URL;

// Connect MongoDB
const mongooseConnect = async ()=>{
    try{
        let connect = await mongoose.connect(URI)
        .then(() => {
            console.log("Connected to the MongoDB Succesfully !!!");
        })
    }
    catch(err){
        console.error("MongoDB connection error:", err);
    }
}

module.exports = mongooseConnect;