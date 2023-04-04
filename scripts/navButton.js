const UIbtn = document.getElementById("UINav");
var UIURL = "https://ui.awin.com/user";

const ProvArbtn = document.getElementById("PANav");
var PAURL = "https://ui.awin.com/provider";

const OProvArbtn = document.getElementById("OPANav");
var OPAURL = "https://ui.awin.com/user/redirect/v1-provider/r/aHR0cHM6Ly91aTIuYXdpbi5jb20vYWRtaW5hcmVhL3Byb3ZpZGVyLw==";

UIbtn.addEventListener('click', function(){
    chrome.tabs.create({ url : UIURL });
});

ProvArbtn.addEventListener('click', function(){
    chrome.tabs.create({ url : PAURL });
});

OProvArbtn.addEventListener('click', function(){
    chrome.tabs.create({ url : OPAURL });
});

// Nested controls for the Attribution Button
const attribBtn = document.getElementById("attribText");
var attribURL = "https://github.com/ajaxburger/Aw-Helper-Extension/wiki";

attribBtn.addEventListener('click', function(){
    chrome.tabs.create({ url : attribURL });
});