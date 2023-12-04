// Router for events (example.com/attendance/###)
// Handles attendance-related requests
const router = require("express").Router()
const User = require("../models/user")
const Attendance = require("../models/attendance")
const auth = require("../scripts/auth")

// Render the attendance page
router.get("/", auth, (req, res) => {
	try {
		// Send the user as well, to print their name in EJS
		res.render("attendance", {user: req.user})
	} catch(err) {
		console.log(err)
	}
})

// Add a new attendance (id = the event to attend)
router.get("/add/:id", auth, async (req, res) => {
	// Create the attendance object we'll upload
	const attendance = new Attendance ({
		event: req.params.id,
		status: true,
		owner: req.user._id
	})
	
	// Save the attendance and send it to confirm
	try {
		await attendance.save()
		res.send(attendance)
	} catch(err) {
		console.log(err)
	}
})

// Delete an attendance (id = the event to delete attenence for)
router.get("/delete/:id", auth, async (req, res) => {
	try {
		// Search for attendance records for the given event for the signed in user
		const result = await Attendance.find({ owner: req.user._id, event: req.params.id })
		
		// If one is found, delete it and send it to confirm
		if (result) {
			// There can only ever be one, but we delete all to be safe
			for (let i = 0; i < result.length; i++) {
				await Attendance.deleteOne({ owner: req.user._id, _id: result[i]._id})
			}
			
			res.send(result)
		}
	} catch (err) {
		console.log(err)
	}
})

// Get full attendence status (currently unused)
router.get("/get", auth, async (req, res) => {
	try {
		// Get all of the attendences for a user
		const result = await Attendance.find({ owner: req.user._id })
		
		// If any exist, send them
		if (result) {
			res.send(result)
		}
	} catch (err) {
		console.log(err)
	}
})

module.exports = router
