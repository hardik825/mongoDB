const app=require("./app")
const dotenv=require("dotenv")
const connectDatabase=require("./config/db")

//Config
dotenv.config({path:"backend/config/config.env"})
const port=process.env.PORT
// const port=5000

//Connecting to database
connectDatabase()

app.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`)
}) 