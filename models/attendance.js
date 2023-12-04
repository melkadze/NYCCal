const mongoose = require("mongoose")

const attendanceSchema = new mongoose.Schema(
	{
		// event being attended
		event: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			unique: true
		},
		// is the user attending? true/false
		status: {
			type: Boolean
		},
		// who set the attendance
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

const Attendance = mongoose.model("Attendance", attendanceSchema)
module.exports = Attendance
