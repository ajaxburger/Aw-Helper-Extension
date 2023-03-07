const fbtn = document.getElementById("fillbutton")

const aid = document.getElementById("affID")

fbtn.addEventListener('click', function(){

    if(aid.checked == true){
        alert("true")
    } else {
        alert ("false")
    }
});