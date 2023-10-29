window.onload = function (){
	
	
    var coll = document.getElementsByClassName("Collapsible");
    for(var i = 0; i<coll.length;i++){
        coll[i].addEventListener("click", function(){
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if(content.style.display === 'block'){
                content.style.display = 'none';
            }
            else {
                content.style.display = "block";
            }
        });
    }

    var btns = document.getElementsByClassName("PreferenceButton");
    for(var i = 0; i<btns.length;i++){
        btns[i].addEventListener("click", function(){
            if(this.style.background != "green"){
                this.style.background = "green";
                this.style.color = "white";
            }
            else {
                this.style.background = "rgb(207, 207, 207)";
                this.style.color = "black";
            }
        })
    }
	
	const submitButton =  document.getElementById("SubmitButton")
	submitButton.addEventListener("click", function(){
		
		let matchedNum = 0
		let requestsCompleted = 0
		
		fetch("/settings/reset", {
		method: "GET",
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
		}).then(function(response) {
			
			for(var i = 0; i<btns.length;i++){
				if (btns[i].style.background == "green") {
					btns[i].style.background = "rgb(207, 207, 207)"
					console.log(btns[i].innerHTML)
					
					matchedNum++
					
					
					fetch("/settings/upload", {
					method: "POST",
					body: JSON.stringify({
					tag: btns[i].innerHTML
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8"
					}
					}).then(function(response) {
						console.log("done with one")
						requestsCompleted++
					});
				}
			}
			
		}).then(function(response) {
			console.log("Start")
			setTimeout(function (){
				if (matchedNum == requestsCompleted) {
					console.log("DONE FOR REAL!!!!")
				} else {
					console.log(matchedNum)
					console.log(requestsCompleted)
				}
				window.location.replace("/events");
			}, 1000);
			console.log("End")
		})
			
		
	})
}
