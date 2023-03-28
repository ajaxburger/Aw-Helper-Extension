// Capturing text boxes
const MIDBox = document.getElementById("clipMID");
const CRBox = document.getElementById("clipCR");
const NFBox = document.getElementById("clipNF");

// Get value from storage, catch if undefined and ignore error.
chrome.storage.local.get("MIDSave", function(MIDRecall) {

    if(typeof MIDRecall == 'undefined'){
        return;
    }
    else {
        MIDBox.value = MIDRecall.MIDSave;
    }

});

chrome.storage.local.get("CRSave", function(CRRecall) {

    if(typeof CRRecall == 'undefined'){
        return;
    }
    else {
        CRBox.value = CRRecall.CRSave;
    }

});

chrome.storage.local.get("NFSave", function(NFRecall) {

    if(typeof NFRecall == 'undefined'){
        return;
    }
    else {
        NFBox.value = NFRecall.NFSave;
    }

});

// Auto saving input as they're typed.

MIDBox.addEventListener("input", function () {
    var MIDBoxData = MIDBox.value;

    chrome.storage.local.set({'MIDSave': MIDBoxData}, function(){
    });

});

CRBox.addEventListener("input", function(){
    var CRBoxData = CRBox.value;

    chrome.storage.local.set({'CRSave': CRBoxData}, function(){
    });
});

NFBox.addEventListener("input", function () {
    var NFBoxData = NFBox.value;

    chrome.storage.local.set({'NFSave': NFBoxData}, function(){
    });
});

// Clear button auto-saves data.

const clear = document.getElementById("clearClipBtn").onclick = function (){
    
    MIDBox.value = ""; CRBox.value = ""; NFBox.value = "";

    var MIDBoxData = MIDBox.value;
    var CRBoxData = CRBox.value;
    var NFBoxData = NFBox.value;

    chrome.storage.local.set({'MIDSave': MIDBoxData}, function(){
    });

    chrome.storage.local.set({'CRSave': CRBoxData}, function(){
    });

    chrome.storage.local.set({'NFSave': NFBoxData}, function(){
    });


}


