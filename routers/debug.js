const router = require("express").Router()

// render debug main
router.get("/", (req, res) => {
	try{
		const {spawn} = require('child_process');
		
		// MAYBE ALIAS THIS TO PYTHON??? TODO: THIS
		const py = spawn('python3', ['python/debug.py']);
		
		py.stdout.on('data', function(output) {
			res.write(output);
			res.end();
		});
		
	} catch(err) {
		console.log(err)
	}
})

module.exports = router
