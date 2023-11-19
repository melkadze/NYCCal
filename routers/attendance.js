const router = require("express").Router()
const User = require("../models/user")
const Attendance = require("../models/attendance")
const auth = require("../scripts/auth")

// add a new attendance
router.get("/add/:id", auth, async (req, res) => {
	// create the attendance obj we'll upload
	const attendance = new Attendance ({
		event: req.params.id,
		status: true,
		owner: req.user._id
	})
	
	// save the attendance and send it to confirm
	try{
		await attendance.save()
		res.send(attendance)
	} catch(err) {
		console.log(err)
	}
})

// delete an attendance
router.get("/delete/:id", auth, async (req, res) => {
	try {
		// search for attendance records for the given event for the signed in user
		const adv = await Attendance.find({ owner: req.user._id, event: req.params.id })
		
		// if one is found, delete it and send it to confirm
		if (adv) {
			for (let i = 0; i < adv.length; i++) {
				// it is impossible to have more than one result, but this is safer
				await Attendance.deleteOne({ owner: req.user._id, _id: adv[i]._id})
			}
			res.send(adv)
		}
	} catch (err) {
		console.log(err)
	}
})

// get full attendence status (unused)
router.get("/get", auth, async (req, res) => {
	try {
		const adv = await Attendance.find({ owner: req.user._id })
		if (adv) {
			console.log ("FULL LIST:")
			console.log(adv)
			res.send(adv)
		}
	} catch (err) {
		console.log(err)
	}
})

module.exports = router
