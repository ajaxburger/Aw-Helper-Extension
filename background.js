// All background functions that need to run throughout the extension.

const MIDInput = document.getElementById("clipMID");
var MIDval = MIDInput.value;

await.chrome.storage.local.set({'MIDStore' : jsVariables}, function(){
    if(chrome.runtime.error){
        console.log("Error");
    }
})