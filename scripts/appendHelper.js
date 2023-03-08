/* Defining button variables */
const fbtn = document.getElementById("fillbutton");
const resbtn = document.getElementById("resetButton")

/* Output Box */
const outField = document.getElementById("opBox");

/* Defining cb values */
const promo = document.getElementById("promo");
const sourCh = document.getElementById("sourCh");
const sourMe = document.getElementById("sourMe");
const camp = document.getElementById("camp");

/* Output Variables */
var promoOut, sourChOut, sourMeOut, campOut;
promoOut = sourChOut = sourMeOut = campOut = "";

let outputObject = {promo, sourCh, sourMe, camp};

/* Listens for click on fill button, outputs based on condition */
fbtn.addEventListener('click', function(){

    if(promo.checked == true){
        promoOut = "utm_content=!!!promotype!!!&"
    }

    if(sourCh.checked == true){
        sourChOut = "utm_source=aw&"
    }

    if(sourMe.checked == true){
        sourMeOut = "utm_medium=awin&"
    }

    if(camp.check == true){
        campOut = "utm_campaign=!!!id!!!&"
    }

    var combineOutput;

    combineOutput = promoOut + sourChOut + sourMeOut + campOut

    outField.value = combineOutput;

});

/* Reset output button */
resbtn.addEventListener('click', function(){

    outField.value = "";

});