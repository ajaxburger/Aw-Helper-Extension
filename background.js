// All background functions that need to run throughout the extension.
chrome.scripting.executeScript(null, {file: "/scripts/techDetect.js"});

// Runs Clipboard save / recall on popup click
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.scripting.executeScript(null, {file: "/scripts/clipSaver"}); 

    console.log ("On-click function has fired");
 });