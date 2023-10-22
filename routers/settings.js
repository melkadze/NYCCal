const router = require("express").Router()
const User = require("../models/user")
const auth = require("../scripts/auth")

router.get("/", auth, (req, res) => {
	try{
		res.render("settings", {user: req.user})
	} catch(err) {
		functions.error(res, 500, err)
	}
})

module.exports = router
