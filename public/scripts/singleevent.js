window.onload = function () {
    

    //Needs to get the old attributes for the share button so that the format is the same with other share buttons
    const getAndReplaceOldDetails = (attribute)=>{
        let starter = attribute;
        let newAttribute = document.getElementById(starter);
        let old = newAttribute.innerHTML;
        newAttribute.innerHTML = "<b>" + starter+ ": </b>" + old;
        //console.log(old);
        return old;
    }    

    const title = getAndReplaceOldDetails("Title");
    const date = getAndReplaceOldDetails("Date");
    const summary = getAndReplaceOldDetails("Summary");
    const price = getAndReplaceOldDetails("Price");

    var button = document.getElementById("SignUp");
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
        })

    var share = document.getElementById("Share");
    share.addEventListener("click",function(){
        let string = title + "\n" + date + "\n" + summary + "\n" + price + "\nlocalhost:3000/events/single/" + this.getAttribute("eventid");
        navigator.clipboard.writeText(string);
        //.then(() => alert("Copied"))
        console.log(string);
    })
}