const express=require('express');
const router=express.Router();

//send otp router
const {sentOtp,signup,login}=require("../controllers/auth");
const {updateProfile,getAllUserDetails,deleteAccount}=require("../controllers/Profile");
const{auth,isUser,isSeller,isAdmin}=require("../middlewares/auth")

router.post("/sentotp",sentOtp);
router.post("/signup",signup);
router.post("/login",login);

router.put("/updateprofile",auth,updateProfile);
router.get("/getuserdetails",auth,getAllUserDetails);
router.delete("/getuserdetails",auth,deleteAccount);
// router.get('/h',auth,(req,res)=>{res.json({message:"hello"})})

module.exports=router;