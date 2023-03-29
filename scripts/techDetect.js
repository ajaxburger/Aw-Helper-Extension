chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  const url = tabs[0].url;

  if (url.includes("chrome://") || url.includes("awin.com")) {
    const restrictedStatus = document.getElementById("restrictedStatus");
    restrictedStatus.textContent = "Restricted URL.";
  } else {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: () => {
        const checkScript = (scriptName) => {
          const scripts = document.getElementsByTagName("script");
          for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src.includes(scriptName)) {
              return true;
            }
          }
          return false;
        };

        const pageSource = document.documentElement.innerHTML;

        var hasGtm = checkScript("gtm.js");
        var hasShopify = checkScript("shopify.com");
        var hasWoocommerce = pageSource.includes("woocommerce");
        var hasDwin1 = pageSource.includes("dwin1.com");

        const gtmPHolder = document.getElementById("gtmStatus");
        const shopifyPHolder = document.getElementById("ShopifyStatus");
        const woocommercePHolder = document.getElementById("WoocommerceStatus");
        const dwin1PHolder = document.getElementById("Dwin1Status");

        if (hasGtm) {
            gtmPHolder.textContent = "GTM.js detected.";
        } else { gtmPHolder.textContent = "GTM.js not detected"}

        if (shopifyPHolder) {
          shopifyPHolder.textContent = hasShopify ? "Shopify.com detected." : "shopify no ";
        }
        if (woocommercePHolder) {
          woocommercePHolder.textContent = hasWoocommerce ? "Woocommerce detected." : "woo no ";
        }
        if (dwin1PHolder) {
          dwin1PHolder.textContent = hasDwin1 ? "Dwin1.com detected." : "dwin no";
        }
      }
    })
  }
});