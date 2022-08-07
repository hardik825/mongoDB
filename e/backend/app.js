const cookieParser = require("cookie-parser")
const express = require("express")
const errorMiddleware=require("./middleware/error")

const app=express()

app.use(cookieParser())
app.use(express.json())

//Route imports
const product=require("./routes/productRoute")
const user=require("./routes/userRoute")

app.use("/api/v1",product)
app.use("/api/v1",user)

//Middleware for Errors

app.use(errorMiddleware)

module.exports=app