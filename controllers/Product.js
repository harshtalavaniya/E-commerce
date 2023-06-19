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
        // let productImage=req.files.productImage;
        
        if(!name || !description || !brand || !price || !category || !countInStock ){
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
        // const uploadImage=await uploadImageToCloudinary(productImage,process.env.FOLDER_NAME);
        const newProduct= await Product.create({
            name,
            description,
            brand,
            price,
            category,
            countInStock,
            // productImage:uploadImage.secure_url,
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

};


exports.getAllProduct=async (req,res)=>{
    try{
        const allProducts=await Product.find().populate('category').populate('user',["firstName",'lastName']).exec();
        return res.status(200).json({
			success: true,
			data: allProducts,
		});

    }catch(error){
        console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch all products data ",
			error: error.message,
		});

    };
};
exports.getProductById=async (req,res)=>{
    try{
       
        const getProducts=await Product.findById(req.params.id).populate('category').populate('user',["firstName",'lastName']).exec();
        if(!getProducts){
            return res.status(404).json({
                success: false,
                message:"product is not found"
            });
        }
        return res.status(200).json({
			success: true,
			data: getProducts,
		});

    }catch(error){
        console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch products data ",
			error: error.message,
		});

    };
};

exports.updateProduct=async (req,res)=>{
    try{
        const{productId,name,
            description,
            brand,
            price,
            category,
            countInStock}=req.body;
        const product=await Product.findById(productId);
        if(!product){
            res.status(400).json({
                success: false,
                message: "Product not found so you can;t upadate ",
                error: error.message,
            });

        }
        if(!name,
            !description ||
            !brand ||
            !price ||
            !category ||
            !countInStock){
                res.status(400).json({
                    success: false,
                    message: "All field are required ",
                    error: error.message,
                });

        };

        product.name=name;
        product.description=description;
        product.brand=brand;
        product.price=price;
        product.category=category;
        product.countInStock=countInStock;4

        await product.save();
        res.status(200).json({
            success: true,
            message: "Product updated ",
            data:product
        });


    }catch(error){
        res.status(500).json({
			success: false,
			message: "Failed to update product products data ",
			error: error.message,
		});

    }
}



