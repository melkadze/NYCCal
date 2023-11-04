const router = require("express").Router()
const User = require("../models/user")
const Preference = require("../models/preference")
const auth = require("../scripts/auth")

router.get("/", auth, (req, res) => {
	try{
		res.render("settings", {user: req.user})
	} catch(err) {
		//// remove these functions.
		functions.error(res, 500, err)
	}
})

//make a new preference
router.post("/upload", auth, async (req, res) => {
	const preference = new Preference ({
		...req.body,
		status: true,
		owner: req.user._id
	})
	try{
		await preference.save()
		res.send(preference)
		console.log(`Sent PREFERENCE: ${preference}`)
	} catch(err) {
		console.log(err)
	}
})

router.get("/reset", auth, async (req, res) => {
	try {
		const adv = await Preference.find({ owner: req.user._id })
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
		const adv = await Preference.find({ owner: req.user._id })
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
