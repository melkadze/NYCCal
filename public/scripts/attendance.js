window.onload = function (){

    let welcomeMessage = document.getElementById("Message"); //needs the user's name to add


    //Function to add an event
	const addEvent = (title, time_location, summary, price, status, id) => {
		let link = "/events/single/" + id;
		let event = "";
		event += `<div class="Event">`;
		event += `<h2><a href="${link}">${title}</a></h2>`;
		event += `<h3><a href="${link}">Time and Location: ${time_location}</a></h3>`;
		event += `<h3><a href="${link}">Summary: ${summary}</a></h3>`;
		event += `<h3><a href="${link}">Price: ${price}</a></h3>`;
		if (status) {
			event += `<button eventid="${id}" class="SignUpButton SignedUpButton">Signed up</button>`;
		} else {
			event += `<button eventid="${id}" class="SignUpButton">Sign up</button>`;
		}
		event += `<button title="${title}" timeLoc="${time_location}" summary="${summary}" price="${price}" "eventid="${id}" class="ShareEventButton"> Share </button>`;
		event += `<hr> </div>`;
		//console.log (event)
		return event;
	}
    
    const createEventList = (response) =>{
		console.log("connected")
        var listing = document.getElementById("EventList"); //gets list id

        //template to add event in the list
		/// what are these for? testing? I added a var to them at the end to keep from crashing -nick
        //listing.innerHTML += addEvent("Title", 11,15,2023,"Some place | 19:00", "Some summary", "Free", false);
        //listing.innerHTML += addEvent("Title", 12,10,2023,"Some place | 20:00", "Some summary", "Free", false);
		for (let i = 0; i < response.length; i++) {
			listing.innerHTML += addEvent(response[i].name, response[i].appointment, response[i].summary, response[i].price, response[i].attending, response[i]._id)
		}

		

        //Sign up Button
		var SignUpButtons = document.querySelectorAll(".SignUpButton");
		SignUpButtons.forEach((button) =>{
			//console.log("THIS IS BUTTON" + button);
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
                //.then(() => alert("Copied"))
                console.log(string);
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
			//console.log(response)
			createEventList(response);
		})
	}


	fetchEvents();
	console.log("connected")
}
