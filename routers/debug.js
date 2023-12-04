// Router for debug (example.com/debug/###)
// Handles debug URLs
const router = require("express").Router()

// Print the debug information
router.get("/", (req, res) => {
	try {
		// Setup the child process of debug.py
		const {spawn} = require('child_process');
		const py = spawn('python3', ['python/debug.py']);
		
		// Print the output of debug.py as the webpage
		py.stdout.on('data', function(output) {
			res.write(output);
			res.end();
		});
	} catch(err) {
		console.log(err)
	}
})

module.exports = router
