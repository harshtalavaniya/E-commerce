const mongoose=require("mongoose");
const mailsender=require("../utils/mailSender")

const OTPSchema= new mongoose.Schema({email: {
    type: String,
    required: true,
},
otp: {
    type: String,
    required: true,
},
createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
},

});

async function sendVerification(email,otp){
    try{
        const mailResponse = await mailsender(
			email,
			"Verification Email",
			otp
		);

    }catch(error){
        console.log("Error occurred while sending email: ", error);
		

    }
}
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerification(this.email, this.otp);
	}
	next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;