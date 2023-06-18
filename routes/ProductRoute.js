
const express=require('express');
const router=express.Router();

const {addProduct}=require("../controllers/Product")
const{auth,isUser,isSeller,isAdmin}=require("../middlewares/auth")


router.post("/addproduct",auth,isSeller,addProduct);




module.exports=router;