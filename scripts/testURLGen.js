const URLgoBtn = document.getElementById("testURLBtn");
const testMID = document.getElementById("testURLMID");
const testPID = document.getElementsByTagName("testURLPID");

// Create tab for values
function createTestTabs(URL) {
    URL.forEach((url) => {
        chrome.tabs.create({ url });
    });
};

URLgoBtn.addEventListener("click", () => {
    const MIDValue = testMID.value;
    const PIDValue = 45628;

    const URL = [`http://awin1.com/awclick.php?mid=${MIDValue}&id=${PIDValue}&clickref=TESTURLGen`];

    createTestTabs(URL);
});