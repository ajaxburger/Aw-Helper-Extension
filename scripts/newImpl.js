// Capture HTML Elements
const importMIDBox = document.getElementById("implMIDBox");
const goBtn = document.getElementById("newImplBtn");

// createTabs function using the Chrome Tabs API
function createTabs(URLs) {
  URLs.forEach((url) => {
    chrome.tabs.create({ url });
  });
}

// goBtn activates the cT function.
goBtn.addEventListener("click", () => {
  const MIDValue = importMIDBox.value;
  const URLs = [
    `https://ui.awin.com/tracking-settings/us/awin/advertiser/${MIDValue}/main-settings`,
    `https://ui.awin.com/commission-manager/us/awin/merchant/${MIDValue}/commission-groups`,
    `https://ui.awin.com/advertiser-mastertag/us/awin/${MIDValue}/trackingtagsettings`,
    `https://ui.awin.com/provider/merchant-settings/${MIDValue}/account-details/network/awin`,
    `https://ui.awin.com/provider/finance/fee-manager/en/${MIDValue}`,
    `https://ui.awin.com/provider/merchant-settings/${MIDValue}/mobile-tracking/network/awin`
  ];

  createTabs(URLs);
});