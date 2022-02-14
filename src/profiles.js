/* global chrome */

import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
var browser = require("webextension-polyfill");

const builtinProfiles = [
    {
        id: "direct",
        name: 'Direct',
        chromeConfig: {
            mode: "direct",
        },
        icon: ArrowForwardIcon,
    },
    {
        id: "system",
        name: "System",
        chromeConfig: {
            mode: "system",
        },
        icon: SettingsSuggestIcon
    },
]

function getBuiltinProfiles() {
    return builtinProfiles;
}

async function setActiveProfile(profile) {
    return browser.storage.sync.set({ 'activeProfile': profile });
}

async function getActiveProfile() {
    return browser.storage.sync.get(['activeProfile']).then(result => result.activeProfile || 'system');
}

function activeProfile(profile) {
    console.log("profile service: active profile: ", profile)
    setActiveProfile(profile);
    const found = builtinProfiles.find(p => p.id === profile);

    // current only support chrome
    chrome.proxy.settings.set(
        { value: found.chromeConfig, scope: 'regular' },
        function () { }
    );

    chrome.action.setBadgeText(
    {
        text: found.name,
    }, () => { /* ... */ });
}

const ProfileService = {
    getBuiltinProfiles,
    getActiveProfile,
    activeProfile,

}

export default ProfileService; 
