const router = require("express").Router()
const passport = require("passport")
const Preference = require("../models/preference")

//login
router.get("/login", (req, res) => {
	try {
		res.render("login", {user: req.user})
	} catch (err) {
		functions.error(res, 500, err)
	}
})

//logout
router.get("/logout", (req, res) => {
	try{
		req.logout()
		res.redirect("/")
	} catch(err) {
		functions.error(res, 500, err)
	}
})

//auth with google
router.get("/google", passport.authenticate("google", {
	scope: ["profile", "email"]
}))

//callback for redirecting
router.get("/google/redirect", passport.authenticate("google"), async (req, res) => {
	// res.redirect("/settings")

	try {
		const prefs = await Preference.find({ owner: req.user._id })
		console.log(prefs)
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
