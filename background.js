// All background functions that need to run throughout the extension.

// On click, run these scripts.
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.scripting.executeScript(null, {file: "/scripts/modeSelect.js"});
    chrome.scripting.executeScript(null, {file: "/scripts/clipSaver.js"});
    chrome.scripting.executeScript(null, {file: "/scripts/techDetect.js"});
    chrome.scripting.executeScript(null, {file: "/scripts/trackingDetect.js"});
});