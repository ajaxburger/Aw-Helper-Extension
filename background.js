// Import the analytics script
importScripts('./scripts/analytics.js');

// Variable to control whether the update popup should open
let disableUpdatePopup = "0"; // Set to "1" to disable, "0" to enable

// Function to report element interactions
async function reportElementInteraction(elementId) {
  await analytics.fireEvent('element_interaction', { element_id: elementId });
}

// Event listener for unhandled rejections
addEventListener('unhandledrejection', async (event) => {
  analytics.fireErrorEvent(event.reason);
});

// Event listener for when the extension is installed or updated
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'update' && disableUpdatePopup === "0") {
    // Open a new tab in a new group when the extension is updated
    chrome.tabs.create({ url: 'https://aniziolek.notion.site/Awin-Helper-Updates-1ec7c46530f34c3691e307f498284fd4?pvs=74', active: false }, (tab) => {
      chrome.tabs.group({ tabIds: [tab.id] }, (groupId) => {
        chrome.tabGroups.update(groupId, {
          title: 'AWH Update',
          color: 'orange'
        });
      });
    });
    analytics.fireEvent('update'); // Optional: Log the update event
  } else if (details.reason === 'install') {
    analytics.fireEvent('install');
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.elementId) {
    console.log('Element interaction received:', request.elementId); // Log the received element ID
    reportElementInteraction(request.elementId);
  }
  if (request.getVersion) {
    // Send the version from manifest.json to the popup script
    const manifestData = chrome.runtime.getManifest();
    sendResponse({ version: manifestData.version });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes("https://awin.lightning.force.com/lightning/r/TSE__c")) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: transformNumbersToLinks // Inject the function after the page is fully loaded
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes("https://awin.lightning.force.com/lightning/r/TSE__c")) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: transformNumbersToLinks // Inject the function after the page is fully loaded
    });
  }
});

function transformNumbersToLinks() {
  // Function to replace numbers with clickable links
  const replaceNumbers = (rootElement = document) => {
    // Query all 'lightning-formatted-text' elements within the provided root element
    rootElement.querySelectorAll('lightning-formatted-text').forEach(element => {
      const textContent = element.textContent.trim();
      if (/^\d+$/.test(textContent)) {  // Check if the content is purely numbers
        const numberLink = document.createElement('a');
        numberLink.href = `https://ui.awin.com/dashboard/awin/advertiser/${textContent}`;
        numberLink.textContent = textContent;
        numberLink.style.color = '#fc8e45';
        numberLink.style.textDecoration = 'underline';
        numberLink.target = '_blank'; // Open in a new tab
        
        // Add tooltip text
        numberLink.title = 'Jump to the UI.'; // Tooltip text

        element.replaceWith(numberLink);
      }
    });
  };

  // Run once when the script is first injected
  replaceNumbers();

  // Set up a MutationObserver to monitor for changes in the DOM
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          replaceNumbers(node); // Re-run the replacement function only for added nodes
        }
      });
    });
  });

  // Start observing the document for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}