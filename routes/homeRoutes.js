const express = require("express")
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')

router.get('/welcome', authMiddleware, (req, res)=>{
    const {username, userId, role} = req.UserInfo
    res.status(202).json({
        username,
        _id: userId,
        role
    })

})
module.exports = router