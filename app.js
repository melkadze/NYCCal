//// NYCCal!
//// Created for CSCI 499 with Professor Raj Korpan
//// Developed by Nick Melkadze and Brajan Halili
//// A full-stack events platform, leveraging the
//// power of Node along with Python and MongoDB.



// Set up our requires
const express = require("express") // simplifies Node
const path = require("path") // allows us to use folder organization more easily
const passport = require("passport") // oAuth authentication platform
const cookieSession = require("cookie-session") // keeps login state as a cookie
require("./scripts/mongoose") // communicate with MongoDB
require("./scripts/passport") // setup passport parameters
require("dotenv").config() // use a .env file to store credentials
						   // only for this demo, we host .env on git

// Begin setting up the app
const app = express() // use Express with Node
app.set("views", path.join(__dirname, "./views")) // define views location
app.set("view engine", "ejs") // use ejs (JS in HTML)
app.use(express.json()) // accept requests as JSON
app.use(express.static(__dirname + "/public")) // export public

// Login cookie persistency
app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000, // one day, in ms
	keys: [process.env.cookieKey] // the encryption key for our cookies
}))

// Initialize passport
app.use(passport.initialize())
app.use(passport.session())

// Set up routers
const rootRouter = require("./routers/root")
const authRouter = require("./routers/auth")
const eventsRouter = require("./routers/events")
const attendanceRouter = require("./routers/attendance")
const settingsRouter = require("./routers/settings")
const debugRouter = require("./routers/debug")
app.use("/", rootRouter)
app.use("/auth", authRouter)
app.use("/events", eventsRouter)
app.use("/attendance", attendanceRouter)
app.use("/settings", settingsRouter)
app.use("/debug", debugRouter)

// Open the server on the port in our .env file
app.listen(process.env.PORT, () => {
	console.log(`Server ready on port ${process.env.PORT}!`)
})
