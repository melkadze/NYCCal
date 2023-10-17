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
       });
    });

    const addEvent = (title, time_location, summary, price) => {
        let event = "";
        event += `<div class="Event">`;
        event += `<h3>${title}</h3>`;
        event += `<p>Time and Location: ${time_location}</p>`;
        event += `<p>Summary: ${summary}</p>`;
        event += `<p>Price: ${price}</p>`;
        event += `<hr> </div>`;
        return event;
    }

    var listings = document.getElementById("Event Listings");
    listings.innerHTML += addEvent("Event 1", "12:00 Hunter College 410 West Building", "Some summary", "Free");
}

