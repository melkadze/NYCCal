// Router for auth (example.com/auth/###)
// Handles all authentication
const router = require("express").Router()
const passport = require("passport")
const Preference = require("../models/preference") // to check preferences

// Login
router.get("/login", (req, res) => {
	try {
		// Render the login page
		res.render("login")
	} catch (err) {
		console.log(err)
	}
})

// Logout
router.get("/logout", (req, res) => {
	try{
		// Log out and redirect to home page
		req.logout()
		res.redirect("/")
	} catch(err) {
		console.log(err)
	}
})

// Authenticate with Google
router.get("/google", passport.authenticate("google", {
	// only request basic profile information and email address
	scope: ["profile", "email"]
}))

// Callback for redirecting (post authentication)
router.get("/google/redirect", passport.authenticate("google"), async (req, res) => {
	try {
		// Get the users preferences
		const prefs = await Preference.find({ owner: req.user._id })
		
		// If any exist, go to events, otherwise direct user to select some
		if (prefs.length > 0) {
			res.redirect("/events")
		} else {
			res.redirect("/settings")
		}
	} catch (err) {
		console.log(err)
	}
})

module.exports = router
