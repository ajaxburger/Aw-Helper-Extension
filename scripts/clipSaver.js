// Capturing text boxes
const MIDBox = document.getElementById("clipMID");
const CRBox = document.getElementById("clipCR");
const NFBox = document.getElementById("clipNF");

// recallAndSet Function for use with Chrome Storage API
function recallAndSet(box, key) {
    chrome.storage.local.get(key, function(data) {
      if (data[key]) {
        box.value = data[key];
      }
    });
  
    box.addEventListener("input", function () {
      chrome.storage.local.set({[key]: box.value});
    });
  }

// Calling rAS function with desired values
  recallAndSet(MIDBox, "MIDSave");
  recallAndSet(CRBox, "CRSave");
  recallAndSet(NFBox, "NFSave");

// Clear button
const clearBtn = document.getElementById("clearClipBtn");
clearBtn.addEventListener("click", function () {
  MIDBox.value = "";
  CRBox.value = "";
  NFBox.value = "";

  chrome.storage.local.set({
    MIDSave: "",
    CRSave: "",
    NFSave: ""
  });
});