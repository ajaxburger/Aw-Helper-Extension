const fbtn = document.getElementById("fillbutton")

const aid = document.getElementById("affID")
const sourCh = document.getElementById("sourCh")
const sourMe = document.getElementById("sourMe")
const camp = document.getElementById("camp")

fbtn.addEventListener('click', function(){

    if(aid.checked == true){
        alert("true")
    } else {
        alert ("false")
    }
});