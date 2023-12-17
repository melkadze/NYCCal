// Run as soon as the page is ready
window.onload = function (){
	// Get today's date
	let date = new Date();
	
	// Get the present year and month
	let year = date.getFullYear();
	let month = date.getMonth();

	// Get the elements for our day, current date, and icons
	const day = document.querySelector(".calendar-dates");
	const currDate = document.querySelector(".calendar-current-date");
	const icons = document.querySelectorAll(".calendar-navigation span");

	// Set the names for our months
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];

	// Function to generate the calendar and page layout
	const generate = () => {
		// First day of the month
		let dayOne = new Date(year,month,1).getDay();

		// Last date of the month
		let lastDate = new Date(year, month+1, 0).getDate();

		// Last day of the month
		let dayLast = new Date(year, month, lastDate).getDay();

		// Last date of previous month
		let lastMonthDate = new Date(year, month, 0).getDate();

		// Get an empty element for our calendar
		let lit = "";
		
		// Get previous month's dates (that appear before the first of this month)
		for (let i = dayOne; i > 0 ; i--) {
			lit += `<li class="inactive">${lastMonthDate-i+1}</li>`;
		}

		// Get today's date
        const todaysDate = new Date();
		//If the year is before current year or year is the same but month is before current month
		if (todaysDate.getFullYear() > year || (todaysDate.getFullYear() === year && todaysDate.getMonth() > month)) {
			// Add current month's dates
			for (let i = 1; i <= lastDate; i++) {
					lit += `<li class="inactive">${i}</li>`;
			}
		} else {
			// Add current month's dates
			for (let i = 1; i <= lastDate; i++) {
				// If the date is before today, make it inactive
				if (i < date.getDate() && month == new Date().getMonth() && year == new Date().getFullYear()) {
					lit += `<li class="inactive">${i}</li>`;
				} else if (i == date.getDate() && month == new Date().getMonth() && year == new Date().getFullYear()) {
					// If the date is today, make it active
					isToday = "active";
					lit += `<li id="Calendar${i}" class="active"> ${i}</li>`;
				} else {
					// If the date is after today, make it normal/unselected
					lit += `<li id="Calendar${i}"> ${i}</li>`;
				}
			}
		}
		// Add next month's dates (that appear after the last of this month)
		for(let i= dayLast; i < 6; i++){
			lit += `<li class="inactive">${i-dayLast+1}</li>`;
		}

		// Set the current month display
		currDate.innerHTML = `${months[month]} ${year}`;

		// Add the calendar element to the page
		day.innerHTML = lit;
	}
	
	// Run the calendar generation
    generate();

	// Logic for when the next or previous month button is clicked
    icons.forEach(icon => {
       icon.addEventListener("click", ()=>{
			// Make the month the previous one or the next one
			if (icon.id == "calendar-prev") {
				month = month -1;
			} else {
				month = month +1;
			}
			icon.style.pointerEvents = "none"; 
			setTimeout(function(){icon.style.pointerEvents = "";},2000); //
		    // If we change year, update the date accordingly
			if (month<0 || month>11) {
				date = new Date(year,month, new Date().getDate());
				month = date.getMonth();
				year = date.getFullYear();
			} else {
				date = new Date();
			}
		   
		    // Run the calendar generation and get the month's events
			generate();
			fetchEvents(month,year);
		});
    });

	// Function to add an event
	const addEvent = (title, time_location, summary, price, status, id, attend_number) => {
		// Set up the link for the single event page
		let link = "/events/single/" + id;
		
		// Create an empty event element
		let event = "";
		
		// Add event attributes to the element
		event += `<div class="Event">`;
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
	
	// Creates the event header
	const createEventHeader = (date, first) => {
		// Format our date
		const dateFormat = date.getMonth()+1 + '/' + date.getDate() + '/' + date.getFullYear();
		
		// Create an empty element for our header
		let header = "";
		
		// If we are not adding the first event header, add a div close
		if (first == false){
			header += `</div>`;
		}
		
		// Add the id and actual text to our header
		header += `<div id="Listing${date.getDate()}">`;
		header += `<h1> Event Listing: ${dateFormat} </h1>`;
		
		// Return our header
		return header;
	}
	
	// Add an event if there are any
	const addEventIfAvailable = (date, response, counter) => {
		// Create a blank result element
		let result = ""
		
		// Add first event from the response
		if (response.length) {
			// Get the date from the response
			resDate = new Date(Date.parse(response[0].date))
			
			// If the date of the event matches the date we are adding to, add it
			if (date.getDate() == resDate.getDate() && date.getMonth() == resDate.getMonth() && date.getFullYear() == resDate.getFullYear()) {
				// If we have added three events already for today, add a More Events button first
                if (counter == 3) {
					result += `<button class="Collapsible">See more events</button>`;
					result += `<div class="Content">`;
                }
				
				// Add our event to the result
				result += addEvent(response[0].name, response[0].appointment, response[0].summary, response[0].price, response[0].attending, response[0]._id, response[0].attendNumber)
				
				// Increment the counter of events for the day
                counter++
				
				// Get the relevant entry on the calendar
                const calDate = document.getElementById("Calendar" + date.getDate())
				
				// Add the relevant class depending on which event of the day it is
				// (to support the heatmap functionality)
                if (counter == 1) {
                    calDate.className = "one"
                } else if(counter == 2) {
                    calDate.className = "two"
                } else if(counter == 3) {
                    calDate.className = "three"
                } else if(counter > 3) {
                    calDate.className = "threePlus"
                }
			}
		}
		
		// If we have more than one event to add, use recursion
		if (response.length > 1) {
			// Set the recursion's return to an empty element
            let recursionReturn = ""
			
			// Run the recursion on everything but the first element (which we already processed)
			recursionReturn = addEventIfAvailable(date, response.slice(1), counter)
			
			// In case the first element of the response was not for today, replace it with the recursion result
			if (recursionReturn && !recursionReturn.includes`<div class=\"Event\"><h4>No events today!</h4><hr></div>`) {
				if (result) {
					result += recursionReturn
				} else {
					result = recursionReturn
				}
			}
		}

		// If no response, then just write that there are no events on this day
		if (!result) {
			// Create our empty event element
			let event = "";
			
			// Add the text/format to our element
			event += `<div class="Event">`;
			event += `<h4>No events today!</h4>`;
			event += `<hr></div>`;
			
			// Return our element
			return event;
		}
		
		// Return our result
		return result
	}

	// Create the list of events on the page
	const createEventList = (month, year, response) => {
		// Get our event listings element
        let listings = document.getElementById("Event Listings");
		
		// Set its content to nothing
        listings.innerHTML = "";
		
		// Get today's date
        const todaysDate = new Date();
		
		// If the requested month/year combo are before today, stop processing and display nothing
        if (year < todaysDate.getFullYear() || (year == todaysDate.getFullYear() && month < todaysDate.getMonth())) {
            return
        }
		let listingDate;
		// Set variables for the listing's date, and the last day of its month
		if(todaysDate.getMonth() === month && todaysDate.getFullYear() === year){
			 listingDate = todaysDate;
		}
		else {
			listingDate = new Date(year,month,1);
		}
        const lastDateOfMonth = new Date(listingDate.getFullYear(), listingDate.getMonth() + 1, 0)
		
		// Process on the days between the listing's date, and the last day of its month
        for (let i = listingDate.getDate(); i <= lastDateOfMonth.getDate(); i++) {
			// If we are processing the listing date itself, add events to its listing as the first element
            if (i == listingDate.getDate()) {
                listings.innerHTML += createEventHeader(listingDate, true)
				listings.innerHTML += addEventIfAvailable(listingDate, response, 0)
            } else {
				// If we are processing other dates, add events for it without it being the first element
                const nextDate = new Date(listingDate.getFullYear(), listingDate.getMonth(), i)
                listings.innerHTML += createEventHeader(nextDate, false)
				listings.innerHTML += addEventIfAvailable(nextDate, response, 0)
            }
        }
		
		// Close the div in our listings element
        listings += `</div>`;
		
		// Add functionality to the signup buttons
		const SignUpButtons = document.querySelectorAll(".SignUpButton");
		// Execute on all sign up buttons
		SignUpButtons.forEach((button) =>{
			button.addEventListener("click",function(){
				// If the current state is not signed up, then sign up
				if(this.innerHTML == "Sign up"){
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

        // More Events button
        const colls = document.querySelectorAll(".Collapsible");
		// On each instance of the More Events button, add toggle functionality
        colls.forEach((coll)=>{
            coll.addEventListener("click", function(){
				// Set the content that will be collapsed
                const content = this.nextElementSibling;
				
				// Toggle if the content is displayed, and if the More Events button is active
                if (content.style.display == 'block'){
                    content.style.display = 'none';
                    this.style.background = "black";
                } else {
                    content.style.display = "block";
                    this.style.background = "green";
                }
            });
        });

        // Calendar date clicking functionality
        for (let i = 1; i < 32; i++) {
            // Get the current iteration's date
            const calDate = document.getElementById("Calendar" + i);
			
			// Only run if the date was found
            if (calDate != null) {
                // Get the relevant listing for the date
                let listing = document.getElementById("Listing" + i);
				
				// Only run if the listing was found
                if (listing != null) {
					// Create the href link to the listing, and add it to the calendar date
                    const link = "<a class='Calendar-Click' href='#" + listing.id +"'>" + i + "</a>";
                    calDate.innerHTML = link;
                }
            }
        }
    }
	
	// Get the events and create the event list
	const fetchEvents = (month, year) => {
		fetch("/events/get", {
			method: "GET",
			headers: {
				"Content-type": "application/json"
			}
		}) // After we fetch, make them into JSON
		.then(response => response.json())
		.then(response => {
			// Create the events list
			createEventList(month,year,response);
		})
	}
	
	// Start fetching the events for the selected month and year
	fetchEvents(month,year);
}
