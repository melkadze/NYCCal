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
}