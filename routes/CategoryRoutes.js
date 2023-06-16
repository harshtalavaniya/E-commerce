const express=require('express');
const router=express.Router();

const {createCategory,getAllCategory,updateCategory}=require("../controllers/Category")
const{auth,isUser,isSeller,isAdmin}=require("../middlewares/auth")


router.post("/createcategory",auth,isAdmin,createCategory);
router.get("/getallcategory",auth,getAllCategory);
