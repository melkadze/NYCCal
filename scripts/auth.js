// Middleware for authentication

// Check if user is logged in
const auth = (req, res, next) => {
	if (!req.user) {
		// if the user is not logged in on an authenticated page, redirect them to log in
		res.redirect("/auth/login")
	} else {
		// if the user is logged in, then great! continue processing
		next()
	}
}

module.exports = auth
