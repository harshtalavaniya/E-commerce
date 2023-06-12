const express=require("express");
const app=express();
const{dbConnect}=require("../E-commerce/config/database")
const dotenv=require("dotenv");
dotenv.config();
const PORT=process.env.PORT ||5000







dbConnect()
app.listen(PORT,()=>{
    console.log("server starting")
})