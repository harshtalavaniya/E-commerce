
const express=require('express');
const router=express.Router();

const {addProduct,getAllProduct,getProductById,updateProduct}=require("../controllers/Product")
const{auth,isUser,isSeller,isAdmin}=require("../middlewares/auth")


router.post("/addproduct",auth,isSeller,addProduct);
router.put("/updateproduct",auth,isSeller,updateProduct);
router.get("/getallproducts",auth,getAllProduct);
router.get("/getProductById/:id",auth,getProductById);




module.exports=router;