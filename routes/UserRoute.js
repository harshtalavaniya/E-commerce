const express=require('express');
const router=express.Router();

//send otp router
const {sentOtp,signup}=require("../controllers/auth");

router.post("/sentotp",sentOtp);
router.post("/signup",signup)

module.exports=router;