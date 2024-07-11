//Linking to docs from detection Chips.
const GTMChip = document.getElementById("gtmChip");
GTMChip.addEventListener("click", () => {
    chrome.tabs.create({ url:"https://wiki.awin.com/index.php/GTM_UnconditionalFiring", active: false });
});

const ShopChip = document.getElementById("shopifyChip");
ShopChip.addEventListener("click", () => {
    chrome.tabs.create({ url:"https://wiki.awin.com/index.php/Awin_Access_Shopify_Tracking_Installation_Guide", active: false });
});

const wooChip = document.getElementById("wooCommChip");
wooChip.addEventListener("click", () => {
    chrome.tabs.create({ url:"https://wiki.awin.com/index.php/Awin_Access_WooCommerce_Tracking_Installation_Guide", active: false });
});

const magChip = document.getElementById("magentoChip");
magChip.addEventListener("click", () => {
    chrome.tabs.create({ url:"https://advertiser-success.awin.com/s/article/Integrating-Magento-2-4", active: false });
});