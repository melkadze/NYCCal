const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(
	process.env.mongooseString,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
)
