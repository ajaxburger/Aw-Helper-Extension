console.log('Content script loaded');

// Update version in the popup
chrome.runtime.sendMessage({ getVersion: true }, (response) => {
  if (response && response.version) {
    const versionElement = document.querySelector('.headVer');
    if (versionElement) {
      versionElement.textContent = response.version;
    }
  }
});

// Handle element clicks
document.addEventListener('click', (event) => {
  const interactionID = event.target.id;
  if (interactionID) {
    console.log('Element clicked:', interactionID); // Log the clicked element ID
    chrome.runtime.sendMessage({ elementId: interactionID });
  }
});
