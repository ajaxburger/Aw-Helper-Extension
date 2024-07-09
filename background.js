// All background functions that need to run throughout the extension.

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.techCount !== undefined) {
      chrome.action.setBadgeText({text: request.techCount.toString(), tabId: sender.tab.id});
      chrome.action.setBadgeBackgroundColor({color: "#4CAF50", tabId: sender.tab.id});
    }
  });