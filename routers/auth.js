const router = require("express").Router()
const passport = require("passport")

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
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
	res.redirect("/settings")
})

module.exports = router
