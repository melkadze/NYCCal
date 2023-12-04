// Router for settings (example.com/settings/###)
// Handles settings-related requests
const router = require("express").Router()
const User = require("../models/user")
const Preference = require("../models/preference")
const auth = require("../scripts/auth")

// Render the settings (preferences selection) page
router.get("/", auth, (req, res) => {
	try {
		res.render("settings")
	} catch(err) {
		console.log(err)
	}
})

// Upload a new preference
router.post("/upload", auth, async (req, res) => {
	const preference = new Preference ({
		...req.body,
		status: true,
		owner: req.user._id
	})
	
	try {
		// Save the preference and send a copy as a response
		await preference.save()
		res.send(preference)
	} catch(err) {
		console.log(err)
	}
})

// Wipe all preferences for the user
router.get("/reset", auth, async (req, res) => {
	try {
		// Get all of the user's preferences
		const result = await Preference.find({ owner: req.user._id })
		
		// If any exist, delete them one-by-one
		if (result) {
			for (let i = 0; i < result.length; i++) {
				await Preference.deleteOne({ owner: req.user._id, _id: result[i]._id})
			}
			
			// Send the deleted preferences, if any, as a response
			res.send(result)
		}
	} catch (err) {
		console.log(err)
	}
})

// Provides the list of preferences for the user
router.get("/get", auth, async (req, res) => {
	try {
		// Get all of the user's preferences
		const result = await Preference.find({ owner: req.user._id })
		
		// Send their preferences, if any exist
		if (result) {
			res.send(result)
		}
	} catch (err) {
		console.log(err)
	}
})

module.exports = router
