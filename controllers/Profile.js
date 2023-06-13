const Profile=require("../models/Profile");
const User=require("../models/User");

exports.updateProfile=async (req,res)=>{
    try{
        const { dateofBirth="",address="",contactNumber}=req.body;
        const id=req.user.id
        const userDetails= await User.findById(id);
        const profile=await Profile.findById(userDetails.additionalDetails);

        //update
        profile.dateOfBirth=dateofBirth;
        profile.address=address;
        profile.contactNumber=contactNumber;

        await profile.save();
        return res.json({
			success: true,
			message: "Profile updated successfully",
			profile,
		});

    }catch(error){
        console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});

    }
}

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.deleteAccount=async (req,res)=>{
    try{
        const id=req.user.id;
        const user=await User.findById(id);
        const profile=User.findByIdAndDelete({_id:user.additionalDetails});
        await User.findByIdAndDelete({_id:id});
        res.status(200).json({

            success: true,
            message: "User deleted successfully",
        });

    }catch(error){
        console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
	

    }
    
};
