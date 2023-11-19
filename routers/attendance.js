const router = require("express").Router()
const User = require("../models/user")
const Attendance = require("../models/attendance")
const auth = require("../scripts/auth")

//make a new attendance
router.get("/add/:id", auth, async (req, res) => {
	console.log("WE GOT HERE AT LEAST")
	const attendance = new Attendance ({
		event: req.params.id,
		status: true,
		owner: req.user._id
	})
	try{
		await attendance.save()
		res.send(attendance)
		console.log(`Sent ATTENDANCE: ${attendance}`)
	} catch(err) {
		console.log(err)
	}
})

// delete an attendance
router.get("/delete/:id", auth, async (req, res) => {
	try {
		console.log("WE GOT HERE AT LEAST AND DELETE")
		const adv = await Attendance.find({ owner: req.user._id, event: req.params.id })
		if (adv) {
			console.log ("FULL LIST:")
			console.log(adv)
			for (let i = 0; i < adv.length; i++) {
				await Attendance.deleteOne({ owner: req.user._id, _id: adv[i]._id})
			}
			res.send(adv)
		}
	} catch (err) {
		console.log(err)
	}
})

// get full attendence status
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
