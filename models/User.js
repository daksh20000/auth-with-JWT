const mongoose = require("mongoose")

const User = new mongoose.Schema({
    username:{
        required :true,
        type: String,
        unique: true,
        trim:true,

    },
    email:{
        required :true,
        type: String,
        unique:true,
        trim:true,
        lowercase:true
        
    },
    password:{
        required :true,
        type: String,
        
    },
    role:{
        type:String,
        enum:["user", "admin"],
        default:"user"
    }
})
module.exports = mongoose.model("UserCollection", User)