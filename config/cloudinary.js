const cloudinary = require("cloudinary").v2; //! Cloudinary is being required
require('dotenv').config();

exports.cloudinaryConnect = () => {
	try {
		cloudinary.config({
			//!    ########   Configuring the Cloudinary to Upload MEDIA ########
			cloud_name: process.env.CLOUD_NAME, 
			api_key: process.env.CLOUD_KEY,
			api_secret: process.env.CLOUD_SECRET
	
		});
	} catch (error) {
		console.log(error);
	}
};