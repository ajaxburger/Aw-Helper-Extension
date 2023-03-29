chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  const currentTab = tabs[0];
  const url = currentTab.url;

  if (!url.includes("chrome://") && !url.includes("awin.com")) {
    chrome.scripting.executeScript({
      target: {tabId: currentTab.id},
      function() {
        const scripts = document.getElementsByTagName("script");
        for (let i = 0; i < scripts.length; i++) {
          if (scripts[i].src.includes("gtm.js")) {
            return true;
          }
        }
        return false;
      }
    }, function(result) {
      const containsGtm = result[0].result;
      const gtmStatus = document.getElementById("GTMstatus");
      gtmStatus.textContent = containsGtm ? "This page contains gtm.js" : "This page does not contain gtm.js";
    });
  } else {
    const gtmStatus = document.getElementById("GTMstatus");
    gtmStatus.textContent = "Restricted URL.";
  }
});