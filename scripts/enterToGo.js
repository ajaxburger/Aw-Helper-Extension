const wikiTB = document.getElementById("wikiSearchInput");
const wikiGB = document.getElementById("WikiNav");

if (wikiTB.hasFocus()) {
    wikiTB.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            wikiGB.click();
        }
    })
};