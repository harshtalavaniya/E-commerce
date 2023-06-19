const express=require("express");
const app=express();
const{dbConnect}=require("../E-commerce/config/database")
const dotenv=require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

app.use(cookieParser());

dotenv.config();
const PORT=process.env.PORT ||5000;
// const userRoutes=require("../E-commerce/routes/User")
const userRoute=require("../E-commerce/routes/UserRoute")
const CategoryRoutes=require("../E-commerce/routes/CategoryRoutes")
const ProductRoutes=require("../E-commerce/routes/ProductRoute")
app.use(express.json());
// app.use(cookieParser());
app.use("/api/v1", userRoute);
app.use("/api/v1", CategoryRoutes);
app.use("/api/v1", ProductRoutes);




dbConnect()
app.listen(PORT,()=>{
    console.log("server starting",PORT)
})