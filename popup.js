console.log('Content script loaded');

document.addEventListener('click', (event) => {
  const interactionID = event.target.id;
  if (interactionID) {
    console.log('Element clicked:', interactionID); // Log the clicked element ID
    chrome.runtime.sendMessage({ elementId: interactionID });
  }
});
