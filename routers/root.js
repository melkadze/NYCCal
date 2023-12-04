// Router for root (example.com/###)
// Handles only the root URL
const router = require("express").Router()

// Redirect to the event page
router.get("/", (req, res) => {
	try {
		res.redirect("/events")
	} catch(err) {
		console.log(err)
	}
})

module.exports = router
