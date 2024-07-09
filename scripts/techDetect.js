// DO NOT CHANGE the way that this system works. I've attempted to nest these
// functions and have not been able to get it functioning.

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  const url = tabs[0].url;

  // Checks to see if the URL is a chrome browser page or awin.com URL and cancels if so.
  if (url.includes("chrome://") || url.includes("awin.com") || url.includes("google.com") || url.includes("microsoftedge")) {
  } else {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id}, // Targets active tab
      function: () => {
        // Checks for "gtm.js" in page <script> tags.
        const checkGTM = () => {
          const scripts = document.getElementsByTagName("script");
          gtmID = "";
          for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src.includes("gtm.js")) {
              // Outputs the GTM IDs - working on detecting multiple
              //gtmID = gtmID + scripts[i].src.slice(-11);
              gtmID = scripts[i].src.slice(-11);
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

        const checkNativeLazyLoading = () => {
          const images = document.getElementsByTagName("img");
          for (let i = 0; i < images.length; i++) {
        
            if ((images[i].loading == "lazy"))
            {
                return true;
            }
          }
          return false;
        };

        const checkPluginLazyLoading = () => {
          const images = document.getElementsByTagName("img");
          for (let i = 0; i < images.length; i++) {
            if ((images[i].className.includes("lazyloaded")) || (images[i].loading == "lazyloaded") || (images[i].className.includes("lazyload")) || (images[i].className.includes("lazyload")))
              {
                  return true;
              }
          }

          // Detect WP Rocket - Lazy loading
          if (document.getElementsByClassName("rocket-lazyload").length >= 1)
          {
            return true;
          }
          
          // Detect W3 Total Cache - Lazy Loading
          if (document.body.innerHTML.search("W3 Total Cache") > 1)
          {
            return true;
          }
          return false;
        };

        const checkAWCookie = () => {
          const cookies = document.cookie.split("; ");
          for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].includes("_aw_sn")) {
              return true;
            }
          }
          return false;
        };

        // If checkGTM function returns true, fire runtime message to pull status out of current tab.
        if (checkGTM()) {
          chrome.runtime.sendMessage({status: gtmID});
        }

        if (checkShopify()) {
          chrome.runtime.sendMessage({status: "Shopify Detected"});
        }

        if (checkWooComm()) {
          chrome.runtime.sendMessage({status: "WooCommerce Detected"});
        }
        if (checkNativeLazyLoading()) {
          chrome.runtime.sendMessage({status: "Native Wordpress Lazy Loading Detected"});
        }
        if (checkPluginLazyLoading()) {
          chrome.runtime.sendMessage({status: "Plugin Lazy Loading Detected"});
        }

        if (checkAWCookie()) {
          chrome.runtime.sendMessage({ status: "AW Cookie Detected" });
        }

      }
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.status && (request.status.includes("GTM") || request.status.includes("WooCommerce Detected") || request.status.includes("Plugin Lazy Loading Detected") || request.status.includes("Shopify Detected"))) {
      const compatText = document.getElementById("compatData");
      const easeMSG = document.getElementById("ratingBox");

      if (compatText && easeMSG) {
        compatText.textContent = "Site is compatible!";
        compatText.style.fontWeight = "bold";
        compatText.style.color = "#18a45b";
        easeMSG.style.display = 'flex';
      }
    }
  } catch (error) {
    console.error('Error in onMessage listener:', error);
  }
});


// Listens for "GTM Detected" and adjusts popup HTML based on response.
// These sections to remain modular for changes in their display type.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.status && request.status.includes("GTM")) {
      const gtmPanel = document.getElementById("gtmDisplay");
      const gtmStatus = document.getElementById("gtmText");

      if (gtmPanel && gtmStatus) {
        gtmPanel.style.display = 'grid';
        gtmStatus.textContent = request.status;
      } else {
        if (gtmPanel) {
          gtmPanel.style.display = 'none';
        }
      }
    }
  } catch (error) {
    console.error('Error in onMessage listener:', error);
  }
});


// Needs fixing.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.status === "WooCommerce Detected") {
    const wooPanel = document.getElementById("wooCommDisplay");
    const wooStatus = document.getElementById("wooCommStatus");
    if (wooStatus) {
      wooPanel.style.display = 'grid';
      wooStatus.textContent = "WooCommerce";
    }
    else {
      wooPanel.style.display = 'none';
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.status === "Native Wordpress Lazy Loading Detected") {
    const status = document.getElementById("nativeLazyLoadingStatus");
    if (status) {
      status.textContent = "Native Wordpress Lazy Loading";
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.status === "Plugin Lazy Loading Detected") {
    const status = document.getElementById("pluginLazyLoadingStatus");
    if (status) {
      status.textContent = "Plugin Wordpress Lazy Loading";
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.status === "Shopify Detected") {
    const shopifyStatus = document.getElementById("ShopifyStatus");
    if (shopifyStatus) {
      shopifyStatus.textContent = "Shopify";
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.status && request.status.includes("AW Cookie Detected")) {
      const awPanel = document.getElementById("awCookieDisplay");
      if (awCookieText && awPanel) {
        awPanel.style.display = 'grid';
      }
    }
  } catch (error) {
    console.error('Error in onMessage listener:', error);
  }
});