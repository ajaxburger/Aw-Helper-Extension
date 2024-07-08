// DO NOT CHANGE the way that this system works. I've attempted to nest these
// functions and have not been able to get it functioning.

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  const url = tabs[0].url;

  // Checks to see if the URL is a chrome browser page or awin.com URL and cancels if so.
  if (url.includes("chrome://") || url.includes("awin.com") || url.includes("google.com") || url.includes("microsoftedge")) {
    const restrictedStatus = document.getElementById("restrictedStatus");
    restrictedStatus.textContent = "Restricted URL";
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

        const checkCookie = () => {
          const cookies = document.cookie.split(";")
          
          // Trim leading spaces from cookies
          // cookies = cookies.map(function (el) {
          //   return el.trim();
          // });

          for (let i = 0; i < cookies.length; i++){
            if (cookies[i].includes("_aw_sn")){
              awc = cookies[i]
              return true;
            }
          }
          return false;
        };

        // If checkGTM function returns true, fire runtime message to pull status out of current tab.
        if (checkGTM()) {
          chrome.runtime.sendMessage({status: "GTM Detected: " + gtmID});
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

        if (checkCookie()) {
          chrome.runtime.sendMessage({status: awc});
        }
      }
    });
  }
});

// Listens for "GTM Detected" and adjusts popup HTML based on response.
// These sections to remain modular for changes in their display type.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.status.includes("GTM")) {
    const gtmStatus = document.getElementById("gtmStatus");
    if (gtmStatus) {
      gtmStatus.textContent = request.status;
    }
  }
});

// Needs fixing.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.status === "WooCommerce Detected") {
    const wooStatus = document.getElementById("WoocommerceStatus");
    if (wooStatus) {
      wooStatus.textContent = "WooCommerce detected!";
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
    const dwin1Status = document.getElementById("ShopifyStatus");
    if (dwin1Status) {
      dwin1Status.textContent = "Shopify detected!";
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.status.includes("_aw_sn")) {
    const conversionAWC = document.getElementById("conversionAWC");
    if (conversionAWC) {
      tooltipAWCText.textContent = request.status.split("=")[1];
      conversionAWC.textContent = "AWC Detected";
    }
  }
});