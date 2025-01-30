require('dotenv').config() //env files : npm i dotenv
const authRouter = require('./routes/auth-routes')
const homeRouter = require("./routes/homeRoutes")
const adminRouter = require("./routes/adminRoutes")
const express = require("express")
const app =express()

const connectionToDb = require("./database/db")


//connecting to DB
connectionToDb()

//middlewares
app.use(express.json())

//using routers
app.use('/api/auth',authRouter)
app.use("/api/home",homeRouter )
app.use("/api/admin", adminRouter)

const PORT= process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("Server running on Port no.", PORT)
})
