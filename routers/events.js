const router = require("express").Router()
const User = require("../models/user")
const Event = require("../models/event")
const auth = require("../scripts/auth")

router.get("/", auth, (req, res) => {
	try{
		res.render("events")
	} catch(err) {
		functions.error(res, 500, err)
	}
})

module.exports = router
