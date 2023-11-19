const router = require("express").Router()
const User = require("../models/user")
const Event = require("../models/event")
const Preference = require("../models/preference")
const Attendance = require("../models/attendance")
const auth = require("../scripts/auth")

router.get("/", auth, (req, res) => {
	try{
		res.render("events")
	} catch(err) {
		functions.error(res, 500, err)
	}
})

router.get("/add", auth, (req, res) => {
	try{
		res.render("addEvent")
	} catch(err) {
		functions.error(res, 500, err)
	}
})

//make a new event
router.post("/add", auth, async (req, res) => {
	const event = new Event ({
		...req.body,
		owner: req.user._id
	})
	try{
		await event.save()
		res.send(event)
		console.log(`Sent EVENT: ${event}`)
	} catch(err) {
		console.log(err)
	}
})

// retrieves personalized events list
router.get("/get", auth, async (req, res) => {
	try {
		const prefs = await Preference.find({ owner: req.user._id })
		const allEvents = await Event.find({})
		const attend = await Attendance.find({ owner: req.user._id })
		
		//console.log(prefs)
		//console.log(allEvents)
		console.log(attend)
		
		let userEvents = []
		
		if (allEvents && prefs) {
			for (let i = 0; i < allEvents.length; i++) {
				let skipEvent = true
				
				for (let j = 0; j < prefs.length; j++) {
					console.log(`checking ${allEvents[i].name} with ${prefs[j].tag}`)
					if (prefs[j].status == true && allEvents[i].tags.toLowerCase().includes(prefs[j].tag.toLowerCase())) {
						console.log("matched!")
						skipEvent = false
					}
				}
				
				if (!skipEvent) {
					toPush = { ...allEvents[i]}
					attendStatus = false
					
					for (let k = 0; k < attend.length; k++) {
						console.log("----", attend[k].event, "-", allEvents[i]._id, "---")
						if (attend[k].event.equals(allEvents[i]._id)) {
							console.log("MATCH")
							attendStatus = attend[k].status
						}
					}
					
					toPush["_doc"]["attending"] = attendStatus
					
					userEvents.push(toPush["_doc"])
				}
			}
		}
		
		console.log("sent events:")
		console.log(userEvents)
		res.json(userEvents)
	} catch (err) {
		console.log(err)
	}
})

module.exports = router
