// Capture HTML Elements
const importMIDBox2 = document.getElementById("inRevMIDBox");
const goBtn2 = document.getElementById("intRevBtn");


// createTabs and Group them using Chrome API
function createAndGroupTabs(URLs) {
  let tabIds = [];

  const tabMID = importMIDBox2.value;
  URLs.forEach((url, index) => {
    chrome.tabs.create({ url: url, active: false }, (tab) => {
      tabIds.push(tab.id);
      if (tabIds.length === URLs.length) {
        // Once all tabs are created, group them
        chrome.tabs.group({ tabIds: tabIds }, (groupId) => {
          // Update the group with a name and color
          chrome.tabGroups.update(groupId, {
            title: tabMID + " IR",
            color: 'orange'
          });
        });
      }
    });
  });
}

// goBtn activates the cT function.
goBtn2.addEventListener("click", () => {
  const MIDValue = importMIDBox2.value;
  const URLs = [
    `https://ui.awin.com/tracking-settings/us/awin/advertiser/${MIDValue}/main-settings`,
    `https://ui.awin.com/commission-manager/us/awin/merchant/${MIDValue}/commission-groups`,
    `https://ui.awin.com/advertiser-mastertag/us/awin/${MIDValue}/plugins`,
    `https://ui.awin.com/advertiser-integration-tool/trackingwizard/us/awin/merchant/${MIDValue}`,
    `https://ui.awin.com/provider/finance/fee-manager/en/${MIDValue}`,
    `https://ui2.awin.com/adminarea/provider/merchantdetail.php?mid=${MIDValue}`
  ];

  createAndGroupTabs(URLs);
});