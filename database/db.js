require('dotenv').config()

const mongoose = require("mongoose");

const connectionToDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo Database connected Successfully ")
    } catch (error) {
        console.log(error,"connection to db failed")
        process.exit(1);
    }
}

module.exports = connectionToDb 