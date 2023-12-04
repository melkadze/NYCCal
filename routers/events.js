// Router for events (example.com/events/###)
// Handles events-related requests
const router = require("express").Router()
const User = require("../models/user")
const Event = require("../models/event")
const Preference = require("../models/preference")
const Attendance = require("../models/attendance")
const auth = require("../scripts/auth")

// Render the main events page
router.get("/", auth, (req, res) => {
	try {
		res.render("events")
	} catch(err) {
		console.log(err)
	}
})

// Render the single event page
router.get("/single/:id", auth, async (req, res) => {
	try {
		// Find the requested event in the DB, and if the user is attending it
		const result = await Event.find({ _id: req.params.id })
		const attend = await Attendance.find({ owner: req.user._id, event: req.params.id })
		
		// Create an attending status variable
		let attendStatus
		
		// If an attending status for the event was found, and its status is active,
		// then set attendStatus to true. Otherwise, false.
		// Note that we first check the length of attend before getting an index.
		// Since if the first component of an and statement is false, the second does not
		// get checked/executed, we will avoid undefined behavior
		if (attend.length && attend[0].status) {
			attendStatus = true
		} else {
			attendStatus = false
		}
		
		// Get the number of ALL users that are attending the event
		const attendAll = await Attendance.find({ event: req.params.id, status: true })
		const attendNumber = attendAll.length
		
		// Render the page along with the event, active status, and number attending
		res.render("singleevent", {event: result[0], active: attendStatus, attendNumber: attendNumber})
	} catch(err) {
		console.log(err)
	}
})

// Render the add events page (internal/testing only -- not in app spec)
// The app spec also does not include levels of authentication (like
// an admin role), so any authenticated user can access this, but it
// is only used for demo purposes
router.get("/add", auth, (req, res) => {
	try {
		res.render("addEvent")
	} catch(err) {
		console.log(err)
	}
})

// Add a new event
router.post("/add", auth, async (req, res) => {
	// Make an event out of the sent object parameters
	const event = new Event ({...req.body})
	
	// Save the event, and send it back to confirm
	try {
		await event.save()
		res.send(event)
	} catch(err) {
		console.log(err)
	}
})

// Retrieves the user's personalized events list
router.get("/get", auth, async (req, res) => {
	try {
		// Get all events, attendances for the user, and preferences for the user
		const allEvents = await Event.find({})
		const prefs = await Preference.find({ owner: req.user._id })
		const attend = await Attendance.find({ owner: req.user._id })
		
		// Start with an empty array
		let userEvents = []
		
		// Only execute if the user set any preferences
		if (prefs) {
			// Iterate through every found event
			for (let i = 0; i < allEvents.length; i++) {
				// Assume we are skipping the event (due to no matching preferences)
				let skipEvent = true
				
				// Check the event's tags to see if any match the user's preferences
				for (let j = 0; j < prefs.length; j++) {
					// Change all tags/prefs to lowercase before comparing them
					if (prefs[j].status == true && allEvents[i].tags.toLowerCase().includes(prefs[j].tag.toLowerCase())) {
						// If the one of the event's tags matches the user's preferences, we won't skip it
						skipEvent = false
					}
				}
				
				// Only continue with this event if we know we aren't skipping it
				if (!skipEvent) {
					// Create a variable with the event's information
					toPush = { ...allEvents[i]}
					
					// For now, assume the user is not attending the event
					attendStatus = false
					
					// Iterate through the attendance list
					for (let k = 0; k < attend.length; k++) {
						if (attend[k].event.equals(allEvents[i]._id)) {
							attendStatus = attend[k].status
						}
					}
					
					// Add the attend status to our variable
					toPush["_doc"]["attending"] = attendStatus
					
					// Get the number of ALL users that are attending the event
					const attendAll = await Attendance.find({ event: allEvents[i]._id, status: true })
					const attendNumber = attendAll.length
					
					// Add the number of all users attending the event to our variable
					toPush["_doc"]["attendNumber"] = attendNumber
					
					// ONLY if the user is attending the event and it matches their preferences,
					// push it to our result array
					userEvents.push(toPush["_doc"])
				}
			}
		}
		
		// Send all of the events, in JSON format, regardless of number
		res.json(userEvents)
	} catch (err) {
		console.log(err)
	}
})

// Retrieves the events the user is attending
router.get("/get/attending", auth, async (req, res) => {
	try {
		// Get all events and attendances for the user
		const allEvents = await Event.find({})
		const attend = await Attendance.find({ owner: req.user._id })
		
		// Start with an empty array
		let userEvents = []
		
		// Iterate through every found event
		for (let i = 0; i < allEvents.length; i++) {
			// Create a variable with the event's information
			toPush = { ...allEvents[i]}
			
			// For now, assume the user is not attending the event
			attendStatus = false
			
			// Iterate through the attendance list
			for (let j = 0; j < attend.length; j++) {
				// If the user has an attendance record for the event,
				// set our attend variable to the attend status
				if (attend[j].event.equals(allEvents[i]._id)) {
					attendStatus = attend[j].status
				}
			}
			
			// Add the attend status to our variable
			toPush["_doc"]["attending"] = attendStatus
			
			// Get the number of ALL users that are attending the event
			const attendAll = await Attendance.find({ event: allEvents[i]._id, status: true })
			const attendNumber = attendAll.length
			
			// Add the number of all users attending the event to our variable
			toPush["_doc"]["attendNumber"] = attendNumber
			
			// ONLY if the user is attending the event, push it to our result array
			if (attendStatus) {
				userEvents.push(toPush["_doc"])
			}
		}
		
		// Send all of the events, in JSON format, regardless of number
		res.json(userEvents)
	} catch (err) {
		console.log(err)
	}
})

module.exports = router
