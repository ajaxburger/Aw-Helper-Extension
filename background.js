// All background functions that need to run throughout the extension.


// Runs Clipboard save / recall on popup click
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.scripting.executeScript(null, {file: "/scripts/clipSaver"});
    chrome.scripting.executeScript(null, {file: "/scripts/techDetect.js"});

    console.log ("On-click function has fired");
 });