const fbtn = document.getElementById("fillbutton");
const outField = document.getElementById("opBox");
var ampCounter = 0; /* Counts the number of values checked */

const aid = document.getElementById("affID");
const sourCh = document.getElementById("sourCh");
const sourMe = document.getElementById("sourMe");
const camp = document.getElementById("camp");

var aidout, sourChOut, sourMeOut, campOut;
aidOut = sourChOut = sourMeOut = campOut = "";

fbtn.addEventListener('click', function(){

    if(aid.checked == true){
        aidOut = "!!!affid!!!"
        ampCounter ++
    }
    if(sourCh.checked == true){
        sourChOut = "sourChChecked"
        ampCounter ++
    }
    if(sourMe.checked == true){
        sourMeOut = "sourMeChecked"
        ampCounter ++
    }
    /* Add rest of checks here */
    else{
        alert("Nothing is checked")

    }

    function combineOutput(){
        
    }

    outField.value += combineOutput();
});