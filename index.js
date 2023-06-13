const express=require("express");
const app=express();
const{dbConnect}=require("../E-commerce/config/database")
const dotenv=require("dotenv");

dotenv.config();
const PORT=process.env.PORT ||5000;
// const userRoutes=require("../E-commerce/routes/User")
const userRoute=require("../E-commerce/routes/UserRoute")
app.use(express.json());
// app.use(cookieParser());
app.use("/api/v1", userRoute);




dbConnect()
app.listen(PORT,()=>{
    console.log("server starting",PORT)
})