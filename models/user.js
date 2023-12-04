const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
	{
		// full name
		username: {
			type: String
		},
		// unique ID (used for authentication)
		googleID: {
			type: String,
			unique: true,
			required: true
		},
		// Google email
		email: {
			type: String,
			unique: true
		},
		// Profile photo URL
		thumbnailURL: {
			type: String,
			required: true
		}
	},
	{
		// show when the db item was created and accessed
		timestamps: true
	}
)

const User = mongoose.model("User", userSchema)
module.exports = User
