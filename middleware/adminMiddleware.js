const adminMiddleware = (req, res, next)=>{
    const role = req.UserInfo.role
    if (role !== "admin"){
        return res.status(401).json({
            success: false,
            message: "Access denied! Admin rights required.",
        })
    }
    next()

}
module.exports = adminMiddleware