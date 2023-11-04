window.onload = function (){
	
	const submitButton =  document.getElementById("SubmitButton")
	
	
	submitButton.addEventListener("click", function(){
		fetch("/events/add", {
			method: "POST",
			body: JSON.stringify({
				name: document.getElementById("title").value,
				date: new Date(document.getElementById("year").value, document.getElementById("month").value - 1, document.getElementById("day").value),
				appointment: document.getElementById("TimeandLocation").value,
				summary: document.getElementById("Summary").value,
				description: document.getElementById("FullDescription").value,
				contact: document.getElementById("ContactInformation").value,
				price: document.getElementById("Price").value,
				accessibility: document.getElementById("AccessibilityOptions").value,
				tags: document.getElementById("Tags").value
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
	})
}
