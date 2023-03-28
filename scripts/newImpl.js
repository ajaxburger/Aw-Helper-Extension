const implMIDBox = document.getElementById("implMID");

const goBtn = document.getElementById("newImplBtn").onclick = function () {

    var MIDValue = implMIDBox.value;

    var URL1 = "https://ui.awin.com/tracking-settings/us/awin/advertiser/" + MIDValue.value + "/main-settings"

    chrome.tabs.create({ url : URL1 })

}