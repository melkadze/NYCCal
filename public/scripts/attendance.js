// Run as soon as the page is ready
window.onload = function (){
    //Function to add an event
	const addEvent = (title, time_location, summary, price, status, id, attend_number) => {
		let link = "/events/single/" + id;
		let event = "";
		event += `<div class="Event">`;
		event += `<h2><a href="${link}">${title}</a></h2>`;
		event += `<h3><a href="${link}">Time and Location: ${time_location}</a></h3>`;
		event += `<h3><a href="${link}">Summary: ${summary}</a></h3>`;
		event += `<h3><a href="${link}">Price: ${price}</a></h3>`;
		event += `<h3><a href="${link}">Users already signed up: ${attend_number}</a></h3>`;
		if (status) {
			event += `<button eventid="${id}" class="SignUpButton SignedUpButton">Signed up</button>`;
		} else {
			event += `<button eventid="${id}" class="SignUpButton">Sign up</button>`;
		}
		event += `<button title="${title}" timeLoc="${time_location}" summary="${summary}" price="${price}" "eventid="${id}" class="ShareEventButton"> Share </button>`;
		event += `<hr> </div>`;
		return event;
	}
    
    const createEventList = (response) =>{
        var listing = document.getElementById("EventList"); //gets list id
		for (let i = 0; i < response.length; i++) {
			listing.innerHTML += addEvent(response[i].name, response[i].appointment, response[i].summary, response[i].price, response[i].attending, response[i]._id, response[0].attendNumber)
		}

        //Sign up Button
		var SignUpButtons = document.querySelectorAll(".SignUpButton");
		SignUpButtons.forEach((button) =>{
			button.addEventListener("click",function(){
				if(this.innerHTML === "Sign up"){
					/// upload add
					fetch(`/attendance/add/${this.getAttribute("eventid")}`,
						  {method: "GET"})
					
					this.style.background = "green";
					this.innerHTML = "Signed up";
				}
				else {
					// upload remove
					fetch(`/attendance/delete/${this.getAttribute("eventid")}`,
						  {method: "GET"})
					
					if (this.classList.contains("SignedUpButton")) {
						this.classList.remove("SignedUpButton")
					}
					
					this.style.background = "blue";
					this.innerHTML = "Sign up";
				}
			});})

        //Share Button
        var ShareButtons = document.querySelectorAll(".ShareEventButton");
        ShareButtons.forEach((button)=>{
            button.addEventListener("click",function(){
                let string = this.getAttribute("title") + "\n" + this.getAttribute("timeLoc") + "\n" + this.getAttribute("summary")
							 + "\n" + this.getAttribute("price") + "\nlocalhost:3000/events/single/" + this.getAttribute("eventid");
                navigator.clipboard.writeText(string);
				this.style.background = "green";
				this.innerHTML = "Copied to clipboard!"
            })
        });

        //More Events Button
        var colls = document.querySelectorAll(".Collapsible");
        colls.forEach((coll)=>{
            coll.addEventListener("click", function(){
                var content = this.nextElementSibling;
                if(content.style.display === 'block'){
                    content.style.display = 'none';
                    this.style.background = "black";
                }
                else {
                    content.style.display = "block";
                    this.style.background = "green";
                }
            });
        });        
    }
	
	const fetchEvents = () => {
		fetch("/events/get/attending", {
		method: "GET",
		headers: {
			"Content-type": "application/json"
		}
		})
		.then(response => response.json())
		.then(response => {
			createEventList(response);
		})
	}

	fetchEvents();
}
