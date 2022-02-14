var browser = require("webextension-polyfill");

(async () => {
    let tabs = await browser.tabs.query({});
    console.log(tabs)
})();
