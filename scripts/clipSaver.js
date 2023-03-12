const MIDBox = document.getElementById("clipMID");
const MIDBoxData = MIDBox.textContent;

const MIDKey = 'MIDKey';
const MIDValue = { name: MIDBoxData};

chrome.storage.local.set({MIDKey: MIDValue}, () => {
    alert('Stored name: ' + value.name)
});

chrome.storage.local.get([MIDKey], (result) => {
    alert('Retrieved name: ' + MIDKey.textContent.MIDKey.name)
})