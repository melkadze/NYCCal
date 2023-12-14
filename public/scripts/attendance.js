// Run as soon as the page is ready
window.onload = function (){
    // Function to add an event
	const addEvent = (title, time_location, summary, price, status, id, attend_number, history) => {
		// Set up the link for the single event page
		let link = "/events/single/" + id;
		
		// Create an empty event element
		let event = "";
		
		// Add event attributes to the element
		if(history)
		{
			event += `<div class="EventHistory" style="overflow: hidden;display: none;">`;
		}
		else {
			event += `<div class="Event">`;
		}
		event += `<h2><a href="${link}">${title}</a></h2>`;
		event += `<h3><a href="${link}">Time and Location: ${time_location}</a></h3>`;
		event += `<h3><a href="${link}">Summary: ${summary}</a></h3>`;
		event += `<h3><a href="${link}">Price: ${price}</a></h3>`;
		event += `<h3><a href="${link}">Users already signed up: ${attend_number}</a></h3>`;
		
		// If the event is active, mark it as Signed Up,
		// otherwise make it Sign Up (inactive)
		if (status) {
			event += `<button eventid="${id}" class="SignUpButton SignedUpButton">Signed up</button>`;
		} else {
			event += `<button eventid="${id}" class="SignUpButton">Sign up</button>`;
		}
		
		// Add the Share button
		event += `<button title="${title}" timeLoc="${time_location}" summary="${summary}" price="${price}" eventid="${id}" class="ShareEventButton"> Share </button>`;
		
		// End the element and return it
		event += `<hr> </div>`;
		return event;
	}
    
	const createHistoryList = (response) =>{
		const listing = document.getElementById("HistoryList");
		listing.innerHTML += `<button class="Collapsible">Previous events</button>`;
		// num of events to check if any
		let numEvents = 0;
		//get today's date
		let dateToday = new Date();
		for (let i = 0; i < response.length; i++) {
			//response's date
			let resDate = new Date(Date.parse(response[i].date))
			//If the event is from previous years OR if the event is from this year but previous months OR if the event is from this month but previous days
			if(dateToday.getFullYear() > resDate.getFullYear() || 
			(dateToday.getFullYear() === resDate.getFullYear() && dateToday.getMonth() > resDate.getMonth()) || 
			(dateToday.getMonth() === resDate.getMonth() && dateToday.getDate() > resDate.getDate())){
				listing.innerHTML += addEvent(response[i].name, response[i].appointment, response[i].summary, response[i].price, response[i].attending, response[i]._id, response[0].attendNumber, true)
				numEvents++;
			}
		}

		// get collapsible
		const coll = document.querySelector(".Collapsible");
		
		if(numEvents === 0){
			coll.innerHTML = "There are no previous events";
		}
		coll.addEventListener("click", function(){
			if (numEvents > 0) {
				// Set the content that will be collapsed
				const oldEvents = document.querySelectorAll(".EventHistory");

				// Toggle if the content is displayed, and if the More Events button is active
				if (this.style.background != 'green') {
					oldEvents.forEach((event) => {
						event.style.display = "block";
					})
					this.style.background = 'green'
				}
				else {
					oldEvents.forEach((event) => {
						event.style.display = "none";
					})
					this.style.background = 'black'
				}
			}
		});
	}

	// Create the list of events on the page
    const createEventList = (response) =>{
		// Get the listing element
        const listing = document.getElementById("EventList");
		//get today's date
		let dateToday = new Date();		
		// Add the events themselves based on the response from the server
		for (let i = 0; i < response.length; i++) {
			//response's date
			let resDate = new Date(Date.parse(response[i].date))			
			//If the event is from future years OR if the event is from this year but future months OR if the event is from this month but future days or today
			if(dateToday.getFullYear() < resDate.getFullYear() || 
			(dateToday.getFullYear() === resDate.getFullYear() && dateToday.getMonth() < resDate.getMonth()) || 
			(dateToday.getMonth() === resDate.getMonth() && dateToday.getDate() <= resDate.getDate())){
				listing.innerHTML += addEvent(response[i].name, response[i].appointment, response[i].summary, response[i].price, response[i].attending, response[i]._id, response[0].attendNumber)
			}			
		}

        // Add functionality to the signup buttons
		const SignUpButtons = document.querySelectorAll(".SignUpButton");
		// Execute on all sign up buttons
		SignUpButtons.forEach((button) =>{
			button.addEventListener("click",function(){
				// If the current state is not signed up, then sign up
				if(this.innerHTML === "Sign up"){
					// Send the sign up request
					fetch(`/attendance/add/${this.getAttribute("eventid")}`,
						  {method: "GET"})
					
					// Style the button to show you are signed up
					this.style.background = "green";
					this.innerHTML = "Signed up";
				} else {
					// If the current state is signed up, then remove the sign up
					// Send the delete sign up request
					fetch(`/attendance/delete/${this.getAttribute("eventid")}`, {method: "GET"})
					
					// If the helper class exists, remove it now to allow the button to change state visually
					// (the helper class is used when an event is shown as attended at page load)
					if (this.classList.contains("SignedUpButton")) {
						this.classList.remove("SignedUpButton")
					}
					
					// Style the button to show you are not signed up
					this.style.background = "blue";
					this.innerHTML = "Sign up";
				}
			});
		})

		// Add functionality to the share button
        const ShareButtons = document.querySelectorAll(".ShareEventButton");
		// Execute on each share button
        ShareButtons.forEach((button)=>{
            button.addEventListener("click",function(){
				// Set the string that will be copied to clipboard
                let clip = this.getAttribute("title") + "\n" + this.getAttribute("timeLoc") + "\n" + this.getAttribute("summary") + "\n" + this.getAttribute("price") + "\nhttps://nyccal.glitch.me/events/single/" + this.getAttribute("eventid");
				
				// Write the string
                navigator.clipboard.writeText(clip);
				
				// Style the button to show the text was copied
				this.style.background = "green";
				this.innerHTML = "Copied to clipboard!"
            })
        });
    }
	
	// Get the events and create the event list
	const fetchEvents = () => {
		fetch("/events/get/attending", {
			method: "GET",
			headers: {
				"Content-type": "application/json"
			}
		}) // After we fetch, make them into JSON
		.then(response => response.json())
		.then(response => {
			//Create history attendance
			createHistoryList(response);
			// Create the events list
			createEventList(response);
		})
	}

	// Start fetching the events
	fetchEvents();
}
