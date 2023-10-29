const router = require("express").Router()

// for now, just redirect to user settings if possible
router.get("/", (req, res) => {
	try{
		res.redirect("/settings")
	} catch(err) {
		functions.error(res, 500, err)
	}
})

module.exports = router
