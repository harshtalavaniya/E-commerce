const jwt=require("jsonwebtoken");
require('dotenv').config();
const User=require("../models/User");


//auth
exports.auth =async(req,res,next)=>{
    try{
        //extract token
        const token=req.cookies.token 
        || req.body.token 
        || req.header("Authorisation").replace("Bearer ", "");

        if(!token){
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;

        }catch(error){
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });

        };
        next();
        

    
    }catch(error){
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });

    }

}


//is user
exports.isUser=async (req,res,next)=>{
    try{
        if(req.user.accountType !=="User"){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for User only',
            });

        }
        next();


    }catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
        })

    }
}

exports.isSeller=async (req,res,next)=>{
    try{
        if(req.user.accountType !=="Seller"){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Sellet only',
            });

        }
        next();


    }catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
        })

    }
};

exports.isAdmin=async (req,res,next)=>{
    try{
        if(req.user.accountType !=="Admin"){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for User only',
            });

        }
        next();


    }catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
        })

    }
}