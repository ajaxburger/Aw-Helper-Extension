chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  const url = tabs[0].url;

  if (url.includes("chrome://") || url.includes("awin.com")) {
    const restrictedStatus = document.getElementById("restrictedStatus");
    restrictedStatus.textContent = "Restricted URL.";
  } else {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: () => {
        const checkGTM = () => {
          const scripts = document.getElementsByTagName("script");
          for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src.includes("gtm.js")) {
              return true;
            }
          }
          return false;
        };

        const checkDWIN = () => {
          const scripts = document.getElementsByTagName("script");
          for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src.includes("dwin1.com")) {
              return true;
            }
          }
          return false;
        };

        const checkShopify = () => {
          const scripts = document.getElementsByTagName("script");
          for (let i = 0; i < scripts.length; i++) {
            if(scripts[i].src.includes("myshopify.com")) {
              return true;
            }
          }
          return false;
        };

        const checkWooComm = () => {
          const scripts = document.getElementsByTagName("script");
          for (let i = 0; i < scripts.length; i++) {
            if(scripts[i].src.includes("woocommerce")) {
              return true;
            }
          }
          return false;
        };

        if (checkGTM()) {
          chrome.runtime.sendMessage({status: "GTM Detected"});
        }

        if (checkDWIN()) {
          chrome.runtime.sendMessage({status: "Mastertag Detected"});
        }

        if (checkShopify()) {
          chrome.runtime.sendMessage({status: "Shopify Detected"});
        }

        if (checkWooComm()) {
          chrome.runtime.sendMessage({status: "WooCommerce Detected"});
        }
      }
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.status === "GTM Detected") {
    const gtmStatus = document.getElementById("gtmStatus");
    if (gtmStatus) {
      gtmStatus.textContent = "GTM Detected!";
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.status === "Mastertag Detected") {
    const dwin1Status = document.getElementById("dwin1Status");
    if (dwin1Status) {
      dwin1Status.textContent = "MasterTag detected!";
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.status === "Shopify Detected") {
    const dwin1Status = document.getElementById("ShopifyStatus");
    if (dwin1Status) {
      dwin1Status.textContent = "Shopify detected!";
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.status === "WooCommerce Detected") {
    const dwin1Status = document.getElementById("WoocommerceStatus");
    if (dwin1Status) {
      dwin1Status.textContent = "WooCommerce detected!";
    }
  }
});