// Configure passport
const passport = require("passport") // use passport
const GoogleStrategy = require("passport-google-oauth20") // use Google oAuth
const User = require("../models/user") // reference our user model
require("dotenv").config() // get the oAuth information from our .env file

// Method to encode user info
passport.serializeUser((user, done) => {
	done(null, user.id)
})

// Method to decode user info
passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user)
	})
})

// oAuth setup
passport.use(
	// use Google oAuth with our callback
	new GoogleStrategy({
		// Set the URL of our hosted application
		callbackURL: `http://nyccal.glitch.me/auth/google/redirect`,
		clientID: process.env.oAuthID,
		clientSecret: process.env.oAuthSecret
	}, (accessToken, refreshToken, profile, done) => {
		// Check if user already exists
		User.findOne({googleID: profile.id}).then((currentUser) => {
			if (currentUser) {
				// We already have the user, so we use the existing account
				done(null, currentUser)
			} else {
				// If we don't have the user, create them in the DB
				new User({
					username: profile.displayName,
					googleID: profile.id,
					email: profile.emails[0].value,
					thumbnailURL: profile.photos[0].value
				}).save().then((newUser) => {
					done(null, newUser)
				})
			}
		})
	})
)
