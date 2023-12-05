// Run as soon as the page is ready
window.onload = function () {
    // Helper function to get the share value of an attribute
    function getShareValue(attribute) {
		return document.getElementById(attribute).getAttribute("shareValue")
    }

	// Add functionality to the signup button
    const signup = document.getElementById("SignUp");
	signup.addEventListener("click",function(){
		// If the current state is not signed up, then sign up
		if(this.innerHTML === "Sign up"){
			// Send the sign up request
			fetch(`/attendance/add/${this.getAttribute("eventid")}`, {method: "GET"})
			
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
	})

	// Add functionality to the share button
    const share = document.getElementById("Share");
    share.addEventListener("click",function(){
		// Set the string that will be copied to clipboard
        let clip = getShareValue("Title") + "\n" + getShareValue("Date") + "\n" + getShareValue("Summary") + "\n" + getShareValue("Price") + "\nlocalhost:3000/events/single/" + this.getAttribute("eventid");
		
		// Write the string
        navigator.clipboard.writeText(clip);
		
		// Style the button to show the text was copied
		this.style.background = "green";
		this.innerHTML = "Copied to clipboard!"
    })
}
