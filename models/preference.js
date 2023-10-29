const mongoose = require("mongoose")

const preferenceSchema = new mongoose.Schema(
	{
		// tag name
		tag: {
			type: String
		},
		// tag true/false
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
		// show when preference was created
		timestamps: true
	}
)


const Preference = mongoose.model("Preference", preferenceSchema)
module.exports = Preference
