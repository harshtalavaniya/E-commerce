const cloudinary=require('cloudinary').v2


exports.uploadImageToCloudinary=async (file,folder,height,quality)=>{
    const otpions ={folder};
    if(height){
        otpions.height=height;

    }if(quality){
        otpions.quality=quality;
    }
    otpions.resource_type="auto";

    return await cloudinary.uploader.upload(file.tempFilePath,otpions)
};