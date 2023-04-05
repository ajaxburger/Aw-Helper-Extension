// All background functions that need to run throughout the extension.


// Runs Clipboard save and techDetect on popup click.
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.scripting.executeScript(null, {file: "/scripts/clipSaver"});
    chrome.scripting.executeScript(null, {file: "/scripts/techDetect.js"});
    chrome.scripting.executeScript(null, {file: "/scripts/trackingDetect.js"});
});