const router = require("express").Router()
const User = require("../models/user")
const Attendance = require("../models/attendance")
const auth = require("../scripts/auth")

//make a new attendance
router.post("/add", auth, async (req, res) => {
	const attendance = new Attendance ({
		...req.body,
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

// delete an attendence
router.post("/delete:id", auth, async (req, res) => {
	try {
		const adv = await Attendance.find({ owner: req.user._id, event: req.params.id })
		if (adv) {
			console.log ("FULL LIST:")
			console.log(adv)
			for (let i = 0; i < adv.length; i++) {
				await Preference.deleteOne({ owner: req.user._id, _id: adv[i]._id})
			}
			res.send(adv)
		}
	} catch (err) {
		console.log(err)
	}
})

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
