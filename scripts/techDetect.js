chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  let url = tabs[0].url;

  if(!url.includes("chrome://") || !url.includes("awin.com")) {

    chrome.scripting.executeScript({
      target: {tabId: tabs.id },
      func: function() {
        var hasGTM = document.documentElement.innerHTML.indexOf("gtm.js") !== -1;

        statText.textContent = "GTM Detected.";
      }
    });

  }
  else {
    const statText = document.getElementById("GTMstatus");

    statText.textContent = "Restricted URL.";
  }

});