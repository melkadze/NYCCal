// Use mongoose for MongoDB, and .env for the key
const mongoose = require("mongoose")
require("dotenv").config()

// Connect to our MongoDB instance with the .env connection string
mongoose.connect(
	process.env.mongooseString,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
)
