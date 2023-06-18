const Product=require("../models/Product");
const User=require("../models/User");
const Category=require("../models/Category");
const { uploadImageToCloudinary } = require("../utils/imageUpload");

exports.addProduct=async (req,res)=>{
    try{
        //get user id
        const user=req.user.id;
        //get prodcut details
        let {
            name,
            description,
            brand,
            price,
            category,
            countInStock,

        }=req.body;
        const image=req.files.image;
        if(!name || !description || !brand || !price || !category || !countInStock || !image){
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory",
            });
        }
        const seller=await User.findById(user,{accountType:"Seller"});
        if(!seller){
            return res.status(400).json({
                success: false,
                message: "Seller detaails not found",
            });
        }
        const categoryId=await Category.findById(category);
        if(!categoryId){
            return res.status(400).json({
                success: false,
                message: "category details not found",
            });
        };
        //upload image
        const uploadImage=await uploadImageToCloudinary(image,process.env.FOLDER_NAME);
        const newProduct= await Product.create({
            name,
            description,
            brand,
            price,
            category,
            countInStock,
            image,
            user:seller._id,
        });
        res.status(200).json({
			success: true,
			data: newProduct,
			message: "Product Created Successfully",
		});



        



    }catch(error){
        console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create product",
			error: error.message,
		});

    }

}


