const express=require('express');
const router=express.Router();

//send otp router
const {sentOtp}=require("../controllers/auth");

router.post("/sentotp",sentOtp);

module.exports=router;