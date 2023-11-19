window.onload = function (){

    let welcomeMessage = document.getElementById("Message"); //needs the user's name to add


    //Function to add an event
    const addEvent = (title, month, day, year, time_location, summary, price, status) => {
        let SignUpButtonID = title + ";:; " + time_location;
        let ShareButtonID = title + ";:; " + time_location + ";:; " + summary + ";:; " + price;
        let event = "";
        event += `<div class="Event">`;
        event += `<h2>${title}</h2>`;
        event += `<h2>Date: ${month}/${day}/${year}</h2>`
        event += `<h3>Time and Location: ${time_location}</h3>`;
        event += `<h3>Summary: ${summary}</h3>`;
        event += `<h3>Price: ${price}</h3>`;
		if (status) {
			event += `<button id="${SignUpButtonID}" class="SignUpButton">Signed up</button>`;
		} else {
			event += `<button id="${SignUpButtonID}" class="SignUpButton">Sign up</button>`;
		}
        event += `<button id="${ShareButtonID}" class="ShareEventButton"> Share </button>`;
        event += `<hr> </div>`;
		//console.log (event)
        return event;
    }
    
    const createEventList = (response) =>{
        var listing = document.getElementById("EventList"); //gets list id

        //template to add event in the list
		/// what are these for? testing? I added a var to them at the end to keep from crashing -nick
        listing.innerHTML += addEvent("Title", 11,15,2023,"Some place | 19:00", "Some summary", "Free", false);
        listing.innerHTML += addEvent("Title", 12,10,2023,"Some place | 20:00", "Some summary", "Free", false);

        //Sign up Button
        var SignUpButtons = document.querySelectorAll(".SignUpButton");
        SignUpButtons.forEach((button) =>{
            //console.log("THIS IS BUTTON" + button);
            let arr = button.id.split(";:; ");
            button.addEventListener("click",function(){
            if(this.innerHTML === "Sign up"){
                this.style.background = "green";
                this.innerHTML = "Signed up";
                //console.log(arr);
            }
            else {
                this.style.background = "blue";
                this.innerHTML = "Sign up";
            }
        });})

        //Share Button
        var ShareButtons = document.querySelectorAll(".ShareEventButton");
        ShareButtons.forEach((button)=>{
            let arr = button.id.split(";:; ");
            button.addEventListener("click",function(){
                let string = arr[0] + "\n" + arr[1] + "\n" + arr[2] + "\n" + arr[3];
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


    createEventList("");
}
