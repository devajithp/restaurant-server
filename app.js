const express = require("express");
const mongoose=require("./database/db")
const cors= require("cors")
const authRouter= require("./Routes/Auth")
const categoryRoute= require("./Routes/Category")
const productRoute= require("./Routes/Product")
const cartRoute= require("./Routes/Cart")
const orderRoute=require("./Routes/Order")
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv= require("dotenv")
dotenv.config();


const app= express();

const PORT=process.env.PORT||5000
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.use(morgan("dev"))
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/category",categoryRoute)
app.use("/api/product",productRoute)
app.use("/api/cart",cartRoute)
app.use("/api/order",orderRoute)


mongoose.connectDB()


app.get("/",(req,res)=>
{
    res.send("hai devajith")
})






app.listen(PORT,()=>
{
    console.log(`server connected to ${PORT}`)
})