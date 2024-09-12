// Capture HTML Elements
const importMIDBox = document.getElementById("implMIDBox");
const goBtn = document.getElementById("newImplBtn");


// createTabs and Group them using Chrome API
function createAndGroupTabs(URLs) {
  let tabIds = [];

  const tabMID = importMIDBox.value;
  URLs.forEach((url, index) => {
    chrome.tabs.create({ url: url, active: false }, (tab) => {
      tabIds.push(tab.id);
      if (tabIds.length === URLs.length) {
        // Once all tabs are created, group them
        chrome.tabs.group({ tabIds: tabIds }, (groupId) => {
          // Update the group with a name and color
          chrome.tabGroups.update(groupId, {
            title: tabMID,
            color: 'orange'
          });
        });
      }
    });
  });
}

// goBtn activates the cT function.
goBtn.addEventListener("click", () => {
  const MIDValue = importMIDBox.value;
  const URLs = [
    `https://ui.awin.com/tracking-settings/us/awin/advertiser/${MIDValue}/main-settings`,
    `https://ui.awin.com/commission-manager/us/awin/merchant/${MIDValue}/commission-groups`,
    `https://ui.awin.com/advertiser-mastertag/us/awin/${MIDValue}/plugins`,
    `https://ui.awin.com/advertiser-mastertag/us/awin/${MIDValue}/trackingtagsettings`,
    `https://ui.awin.com/provider/merchant-settings/${MIDValue}/account-details/network/awin`,
    `https://ui.awin.com/provider/finance/fee-manager/en/${MIDValue}`,
    `https://ui.awin.com/provider/merchant-settings/${MIDValue}/mobile-tracking/network/awin`,
    `https://ui2.awin.com/adminarea/provider/merchantdetail.php?mid=${MIDValue}`,
    `https://ui2.awin.com/adminarea/provider/membershipmanager.php`
  ];

  createAndGroupTabs(URLs);
});