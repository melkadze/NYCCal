window.onload = function (){
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const day = document.querySelector(".calendar-dates");
const currDate = document.querySelector(".calendar-current-date");

const icons = document.querySelectorAll(".calendar-navigation span");

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

const generate = () => {
    //First day of the month
    let dayOne = new Date(year,month,1).getDay();

    //Last date of the month
    let lastDate = new Date(year,month+1,0).getDate();

    //Last day of the month
    let dayLast = new Date(year, month, lastDate).getDay();

    //Last date of previous month
    let lastMonthDate = new Date(year,month,0).getDate();

    let lit = "";
    //Get previous month dates
    for(let i = dayOne; i>0;i--){
        lit += `<li class="inactive">${lastMonthDate-i+1}</li>`;
    }

    //Add current month dates
    for(let i = 1; i<=lastDate;i++){
        let isToday = "";
        if (i===date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()){
            isToday = "active";
        }
        lit += `<li class="${isToday}"> ${i}</li>`;
    }

    //Add next month dates
    for(let i= dayLast; i<6;i++){
        lit += `<li class="inactive">${i-dayLast+1}</li>`;
    }

    currDate.innerHTML = `${months[month]} ${year}`;

    day.innerHTML = lit;
}
    generate();

    icons.forEach(icon => {
       icon.addEventListener("click", ()=>{
            if(icon.id === "calendar-prev"){
                month = month -1;
            }
            else {
                month = month +1;
            }
            if(month<0 || month>11){

                date = new Date(year,month, new Date().getDate());
                month = date.getMonth();
                year = date.getFullYear();
            }
            else{
                date = new Date();
            }
            generate();
            createEventList(month,year);
       });
    });

    //Function to add an event
    const addEvent = (title, time_location, summary, price) => {
        let SignUpButtonID = title + ";;; " + time_location;
        let event = "";
        event += `<div class="Event">`;
        event += `<h2>${title}</h2>`;
        event += `<h3>Time and Location: ${time_location}</h3>`;
        event += `<h3>Summary: ${summary}</h3>`;
        event += `<h3>Price: ${price}</h3>`;
        event += `<button id="${SignUpButtonID}" class="SignUpButton"> Sign up</button>`;
        event += `<button class="ShareEventButton"> Share </button>`;        
        event += `<hr> </div>`;
		console.log (event)
        return event;
    }
	
	//Event header
	const createEventHeader = (date,first) => {
		var dateFormat = date.getMonth()+1 + '/' + date.getDate() + '/' + date.getFullYear();
		let header = "";
		if(first != true){
			header += `</div>`;
		}
		header += `<div>`;
		header += `<h1> Event Listing: ${dateFormat} </h1>`;
		return header;
	}
	
	// nick's helper funct
	const addEventIfAvailable = (date, response) => {
		
		let result
		
		// TODO: currently gets all events. we need to date-gate it
		console.log("got response, or empty")
		console.log(response)
		
		// add first event in the response
		console.log(new Date(Date.parse(response[0].date)))
		console.log(new Date(Date.parse(date)))
		resDate = new Date(Date.parse(response[0].date))
		if (date.getDate() === resDate.getDate()
			&& date.getMonth() === resDate.getMonth()
			&& date.getFullYear() === resDate.getFullYear()) {
			console.log("ADDING!!!!!!!!!!!!!!!!!!")
			result = addEvent(response[0].name, response[0].appointment, response[0].summary, response[0].price)
		}
		
		if (response.length > 1) {
			// if more than one, then use recursion
			console.log(response.length)
			recursionReturn = addEventIfAvailable(date, response.slice(1))
			console.log('recur', recursionReturn)
			console.log('result', result)
			if (recursionReturn && !recursionReturn.includes`<div class=\"Event\"><h4>No events today!</h4><hr> </div>`) {
				console.log("uh oh")
				
				if (result) {
					result += recursionReturn
				}
				else {
					result = recursionReturn
				}
			}
		}
		
		// if no response, then exit
		if (!result) {
			console.log("...or not!")
			let event = "";
			event += `<div class="Event">`;
			event += `<h4>No events today!</h4>`;
			event += `<hr> </div>`;
			console.log (event)
			return event;
		}
		
		console.log("returning ", result)
		return result
	}

    const createEventList = (month, year, response) => {
        var listings = document.getElementById("Event Listings");
        listings.innerHTML = "";        
        var todaysDate = new Date();        
        if(year < todaysDate.getFullYear() || (year === todaysDate.getFullYear() && month < todaysDate.getMonth())){
            return;
        }
        var listingDate;

        if(month === todaysDate.getMonth() && year === todaysDate.getFullYear()){
            //listingDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDay());
			 listingDate = new Date();
        }
        else {
            listingDate = new Date(year,month,1);
        }
        var lastDateOfMonth = new Date(listingDate.getFullYear(), listingDate.getMonth()+1, 0);
		
        for(let i = listingDate.getDate(); i <= lastDateOfMonth.getDate(); i++){
            if(i === listingDate.getDate()){
                listings.innerHTML += createEventHeader(listingDate,true);
				console.log("listing date ", listingDate)
				listings.innerHTML += addEventIfAvailable(listingDate, response)
                //listings.innerHTML += addEvent("Event 1", "12:00 Hunter College 410 West Building", "Some summary", "Free");
            }
            else{
                var nextDate = new Date(listingDate.getFullYear(), listingDate.getMonth(), i);
                listings.innerHTML += createEventHeader(nextDate,false);
				console.log("listing date2 ", nextDate)
				listings.innerHTML += addEventIfAvailable(nextDate, response)
                //listings.innerHTML += addEvent("Event 1", "12:00 Hunter College 410 West Building", "Some summary", "Free");
            }
        } 
        listings += `</div>`;       
    }
	
	const fetchEvents = (month, year) => {
		fetch("/events/get", {
			method: "GET",
			headers: {
				"Content-type": "application/json"
			}
		})
		.then(response => response.json())
		.then(response => {
			console.log(response)
			createEventList(month,year,response);
		})
	}
	
	fetchEvents(month,year)
    
var SignUpButtons = document.querySelectorAll('.SignUpButton');
SignUpButtons.forEach((button) =>{
    let arr = button.id.split(";;; ");
    button.addEventListener("click",function(){
        if(this.innerHTML === "Sign up"){
            this.style.background = "green";
            this.innerHTML = "Signed up";
            console.log(arr);
        }
        else {
            this.style.background = "blue";
            this.innerHTML = "Sign up";
        }
    });
})
}

