const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema(
	{
		// title/name
		name: {
			type: String,
			required: true
		},
		// date (not human-readable)
		date: {
			type: Date,
			required: true
		},
		// time and location
		appointment: {
			type: String,
			required: true
		},
		// short description
		summary: {
			type: String,
			required: true
		},
		// long description
		description: {
			type: String,
			required: true
		},
		// contact information
		contact: {
			type: String,
			required: true
		},
		// string of price, such as Free or $10 or $5/round
		price: {
			type: String,
			required: true
		},
		// accessibility description
		accessibility: {
			type: String,
			required: true
		},
		// string of tags, space-separated
		tags: {
			type: String,
			required: true
		}
	},
	{
		// show when the db item was created and accessed
		timestamps: true
	}
)

const Event = mongoose.model("Event", eventSchema)
module.exports = Event
