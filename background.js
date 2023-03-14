// All background functions that need to run throughout the extension.

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "/scripts/clipSaver"});

    console.log ("Clip Saver has run.");
 });