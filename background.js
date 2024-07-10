// Import the analytics script
importScripts('./scripts/analytics.js');

// Function to report element interactions
async function reportElementInteraction(elementId) {
  await analytics.fireEvent('element_interaction', { element_id: elementId });
}

// Event listener for unhandled rejections
addEventListener('unhandledrejection', async (event) => {
  analytics.fireErrorEvent(event.reason);
});

// Event listener for when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  analytics.fireEvent('install');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.techCount !== undefined) {
    chrome.action.setBadgeText({ text: request.techCount.toString(), tabId: sender.tab.id });
    chrome.action.setBadgeBackgroundColor({ color: "#4CAF50", tabId: sender.tab.id });
  }
  if (request.elementId) {
    console.log('Element interaction received:', request.elementId); // Log the received element ID
    reportElementInteraction(request.elementId);
  }
});

