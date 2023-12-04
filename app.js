// requires
const express = require("express")
const path = require("path")
const app = express()
const passport = require("passport")
const cookieSession = require("cookie-session")
require("./scripts/mongoose")
require("./scripts/passport")
require("dotenv").config()

// app setup
app.set("views", path.join(__dirname, "./views")) //define views location
app.set("view engine", "ejs") //use ejs
app.use(express.json()) // use express
app.use(express.static(__dirname + "/public")) //export public

// login cookie persistency
app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000, //one day, in ms
	keys: [process.env.cookieKey]
}))

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// routers
const rootRouter = require("./routers/root")
const authRouter = require("./routers/auth")
const settingsRouter = require("./routers/settings")
const attendanceRouter = require("./routers/attendance")
const eventsRouter = require("./routers/events")
const debugRouter = require("./routers/debug")
app.use("/", rootRouter)
app.use("/auth", authRouter)
app.use("/settings", settingsRouter)
app.use("/attendance", attendanceRouter)
app.use("/events", eventsRouter)
app.use("/debug", debugRouter)

//open the server
app.listen(process.env.PORT, () => {
	console.log(`Server ready on localhost:${process.env.PORT}!`)
})
