const Category=require("../models/Category");



exports.createCategory=async (req,res)=>{
    //req body
    try{
        const {categoryName,description}=req.body;

        //validate
        if(!categoryName || !description ){
            return res.status(400).send('the category cannot be created!')
        }

        const category=await Category.create({
            categoryName,
            description
        })
        res.status(200).json({
            sucess:true,
            message:"prouct category created",
            category
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            sucess:false,
            message:"errors ocours while creating category",
            
        })
    }
    //save
};


exports.getAllCategory=async (req,res)=>{
    try{
        const allCategory=await Category.find({});
        if(!allCategory){
            res.status(400).json({
                sucess:false,
                message:"there is not any category found"
            })
        }
        res.status(200).json({
            sucess:true,
            message:"all catgory data fetched"
        })

    }catch(error){
        res.status(500).json({
            sucess:false,
            message:"something went wrong while "
        })

    }
   
};

exports.updateCategory=async (req,res)=>{
    try{
        const {categoryName,description,categoryId}=req.body;
        if(!categoryId){
    
        }
    
        const categoryUpdate=await Category.findByIdAndUpdate({_id:categoryId},{
            categoryName:categoryName,
            description:description
        },{new:true})
        res.status(200).json({
            sucess:true,
            message:" catgory data updated",
            data:categoryUpdate,

        })
    

    }catch(error)
   
}
