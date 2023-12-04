// Run as soon as the page is ready
window.onload = function (){
	// Add the event listener for the submit button to upload the event
	const submitButton = document.getElementById("SubmitButton")
	
	submitButton.addEventListener("click", function(){
		// Use our /events/add endpoint
		fetch("/events/add", {
			method: "POST",
			// Send all of the variables we set
			body: JSON.stringify({
				name: document.getElementById("Title").value,
				// Create a Date object based on our year, month, and day
				// Plus, compensate for the fact months are 0-11
				date: new Date(document.getElementById("Year").value, document.getElementById("Month").value - 1, document.getElementById("Day").value),
				appointment: document.getElementById("TimeLocation").value,
				summary: document.getElementById("Summary").value,
				description: document.getElementById("FullDescription").value,
				contact: document.getElementById("ContactInformation").value,
				price: document.getElementById("Price").value,
				accessibility: document.getElementById("AccessibilityOptions").value,
				tags: document.getElementById("Tags").value
			}),
			// Send as JSON
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
	})
}
