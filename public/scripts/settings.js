// Run as soon as the page is ready
window.onload = function (){
	// Logic for the collapsable categories
    var coll = document.getElementsByClassName("Collapsible");
	// Execute for all categories
    for (let i = 0; i < coll.length; i++){
        coll[i].addEventListener("click", function(){
			// Toggle if the collapsable is active
            this.classList.toggle("active");
			
			// Show or hide the collapsable items
            let content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = "block";
            }
        });
    }

	// Logic for each preference button
    var btns = document.getElementsByClassName("PreferenceButton");
	// Execute for all preferences
    for (let i = 0; i < btns.length; i++){
        btns[i].addEventListener("click", function(){
			// Toggle the color of the preferences when clicked
            if (this.style.background != "green") {
                this.style.background = "green";
                this.style.color = "white";
            } else {
                this.style.background = "rgb(207, 207, 207)";
                this.style.color = "black";
            }
        })
    }
	
	// Functionality for the submit button
	const submitButton = document.getElementById("SubmitButton")
	submitButton.addEventListener("click", function() {
		// Reset all preferences for the user, as we'll replace them
		fetch("/settings/reset", {
		method: "GET",
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
		}).then(function(response) {
			// Once the preferences are reset, check all buttons
			for(var i = 0; i < btns.length; i++) {
				// If a button is green (active), change color and upload it
				if (btns[i].style.background == "green") {
					btns[i].style.background = "rgb(207, 207, 207)"
					
					// Upload the button's value as a preference (with no spaces)
					fetch("/settings/upload", {
						method: "POST",
						body: JSON.stringify({
							tag: btns[i].innerHTML.split(' ').join('')
						}),
						headers: {
							"Content-type": "application/json; charset=UTF-8"
						}
					})
				}
			}
		}).then(function(response) {
			// Redirect to events after the preferences are uploaded
			setTimeout(function (){
				window.location.replace("/events");
			}, 1000);
		})
	})
}
