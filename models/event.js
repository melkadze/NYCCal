const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema(
	{
		// full name
		name: {
			type: String
		},
		// time and date
		appointment: {
		type: String
		},
		// description of event
		summary: {
		type: String
		},
		// string of price, such as Free or $10 or $5/round
		price: {
		type: String
		},
		// string of tags, space-separated
		tags: {
		type: String
		},
		// unique ID
		eventID: {
			type: String,
			unique: true
		}
	},
	{
		// show when event was created
		timestamps: true
	}
)

const Event = mongoose.model("Event", eventSchema)
module.exports = Event
