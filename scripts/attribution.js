const attribBtn = document.getElementById("attribText");
var attribURL = "https://github.com/ajaxburger/Aw-Helper-Extension/wiki";

attribBtn.addEventListener('click', function(){
    chrome.tabs.create({ url : attribURL });
});