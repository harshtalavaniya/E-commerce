const express=require('express');
const router=express.Router();

//send otp router
const {sentOtp,signup,login}=require("../controllers/auth");

router.post("/sentotp",sentOtp);
router.post("/signup",signup);
router.post("/login",login);

module.exports=router;