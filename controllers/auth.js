const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const mailSender=require("../utils/mailSender");
const bcrypt=require('bcrypt');
const Profile=require("../models/Profile")
const jwt=require('jsonwebtoken');
// const { use } = require("../routes/UserRoute");
require("dotenv").config();


exports.sentOtp=async (req,res)=>{
    try{
        //fetch mail from body
        const { email }=req.body;
        const checkUserPresent = await User.findOne({ email });
		// to be used in case of signup

		// If user found with provided email
		if (checkUserPresent) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is Already Registered`,
			});
		}

		var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
		const result = await OTP.findOne({ otp: otp });
		console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);
		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
		}
		const otpPayload = { email, otp };
		const otpBody = await OTP.create(otpPayload);
		console.log("OTP Body", otpBody);
		res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp,
		});
        

    }catch(error){
        console.log(error.message);
		return res.status(500).json({ success: false, error: error.message });


    }
};

exports.signup=async(req,res)=>{
	try{
		//fetch data from req body
		const {
			firstName,lastName,email,password,confirmPassword,accountType,otp
		}=req.body
		//validation
		if(!firstName || !lastName ||!email ||!password ||!confirmPassword ||!accountType  ||!otp){
			return res.status(400).json({ success: false, error: error.message ,message:"all field are required"});

		}
		//password compaire
		if(password!==confirmPassword){
			return res.status(400).json({ success: false, error: error.message ,message:"Password are not matched"});
		}
		const checkemail=await User.findOne({email});
		//email validation user exist or not
		if(checkemail){
			return res.status(400).json({ success: false, error: error.message ,message:"User are already registerd"});

		};
		const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		console.log(response);
		if(response.length===0){
			return res.status(400).json({ success: false, error: error.message ,message:"otp are invalid"});

		}else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}

		const hashedPassword =await bcrypt.hash(password,10);
		const profileDetails=await Profile.create({
			gender: null,
			dateOfBirth: null,
			address: null,
			contactNumber: null,
		})

		const createUser= await User.create({firstName,
			lastName,
			email,
			additionalDetails:profileDetails._id,
			password: hashedPassword,
			accountType: accountType,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`

		});
		await mailSender(email,"welcome to E-commerce App","Now you can start shopping ,Enjoy!")
		return res.status(500).json({
			 success: true,
			 message:"New user created",
			 data:createUser
			 });



	}catch(error){
		console.log(error.message);
		return res.status(500).json({ success: false, error: error.message });

	}
};

exports.login=async (req,res)=>{
	try{
		//fetch data from reqbody
		const {email,password}=req.body;
		// validation?
		if(!email || !password){
			return res.status(400).json({ 
				success: false,
				 error: error.message,
				 message:"all fields are required" 
			});
		}
		const user=await User.findOne({email});
		if(!user){
			return res.status(400).json({ 
				success: false,
				 error: error.message,
				 message:"user not have register ,so register first" 
			});

		}
		if(await bcrypt.compare(password,user.password)){
			const token =jwt.sign({
				email:user.email,
				id:user._id,
				accountType:user.accountType,
			},process.env.JWT_SECRET,{expiresIn: "24h"})
			user.token=token;
			user.password=undefined;
			const options={expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});



		}else{
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});

		}
	

	
	}catch(error){
		console.log(error.message);
		return res.status(500).json({ success: false, error: error.message });

	}
}
   