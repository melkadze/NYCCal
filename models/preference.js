const mongoose = require("mongoose")

const preferenceSchema = new mongoose.Schema(
	{
		// preference name
		tag: {
			type: String,
			required: true
		},
		// preference true/false
		status: {
			type: Boolean
		},
		// who set the preference
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true
		}
	},
	{
		// show when the db item was created and accessed
		timestamps: true
	}
)

const Preference = mongoose.model("Preference", preferenceSchema)
module.exports = Preference
