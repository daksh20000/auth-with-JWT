const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")
const router = express.Router()

router.get("/welcome", authMiddleware, adminMiddleware, (req, res)=>{
    return res.json({
        message:"Welcome to the admin page",
    })
})
module.exports = router
