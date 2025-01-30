const { JsonWebTokenError } = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const registerUser = async(req, res)=>{
    try {
        //extracting user info from req body
        const {username, email, password, role} = req.body
        //check if the user is already existing in DB
        const checkExistingUser = await User.findOne({$or:[{username},{email}]})
        if (checkExistingUser) {
            return res.status(200).json({
                success: true,
                message: "User already exists with the same email or username"
            })
        }   
        //hash user password
        const salt = await bcrypt.genSalt(10) //creating salt
        const hashedPassword = await bcrypt.hash(password,salt)

        //creating a new use and save in the db
        const newlyCreatedUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || "user"
        }) 
        if(newlyCreatedUser){
            return res.status(200).json({
                success:true,
                message:"User Created, successfully"
            })
        }
        res.status(400).json({
            success: false,
            message: "Please Try again"
        })

    
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong at our end"
        })
    }
}

const loginUser = async(req, res)=>{
    try {
        const {usernameOrEmail, password} = req.body
        const checkedName =await  User.findOne({$or:[{username:usernameOrEmail},{email:usernameOrEmail}]})
        if(!checkedName){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        //checking password
        const checkedPassword =  await bcrypt.compare(password, checkedName.password)
        if (!checkedPassword){
            return res.status(404).json({
                success: false,
                message: "Incorrect Password"
            })
        }
        const authToken = jwt.sign({
            userId: checkedName._id,
            username: checkedName.username,
            email:checkedName.email,
            role:checkedName.role

        },process.env.JWT_SECRET_KEY,{
            expiresIn:"15m"
        }
        )
        res.status(202).json({
            success:true,
            message:"Userlogged in successfully",
            authToken
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong at our end"
        })
    }
}

module.exports = {loginUser,registerUser}