const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
	{
		//full name
		username: {
			type: String
		},
		// unique ID
		googleID: {
			type: String,
			unique: true
		},
		email: {
			type: String,
			unique: true
		},
		//profile photo
		thumbnailURL: {
			type: String
		}
	},
	{
		// show when account was created and accessed
		timestamps: true
	}
)

const User = mongoose.model("User", userSchema)
module.exports = User
