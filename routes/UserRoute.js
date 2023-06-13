const express=require('express');
const router=express.Router();

//send otp router
const {sentOtp,signup,login}=require("../controllers/auth");
const {updateProfile}=require("../controllers/Profile");
const{auth,isUser,isSeller,isAdmin}=require("../middlewares/auth")

router.post("/sentotp",sentOtp);
router.post("/signup",signup);
router.post("/login",login);

router.put("/updateprofile",auth,updateProfile);

module.exports=router;