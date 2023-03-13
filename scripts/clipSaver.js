const MIDBox = document.getElementById("clipMID"); // MID Box
const CRBox = document.getElementById("clipCR");
const NFBox = document.getElementById("clipNF");

// Empty vars for Chrome storage
var MIDSave = "";
var MIDStoredVal = null;

window.onload = function() {

        if (MIDStoredVal != null) {

            chrome.storage.sync.get(['MIDSave']).then((MIDRecall) => {
                const MIDStoredVal = MIDSave;
        
                alert(MIDStoredVal);

            }); 

            MIDBox.value = MIDStoredVal;
            console.log("Value loaded from storage: " + MIDStoredVal);
        }
};

const save = document.getElementById("saveBtn").onclick = function(){
    var MIDBoxData = MIDBox.value;
    // alert(MIDBoxData);

    chrome.storage.sync.set({'MIDSave': MIDBoxData}, function(){
        alert('Save Success' + MIDBoxData)
    });
};


