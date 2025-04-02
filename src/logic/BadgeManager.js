// logic/BadgeManager.js
export const updateBadge = (count) => {
    chrome.action.setBadgeText({ text: count > 0 ? count.toString() : "" });
    chrome.action.setBadgeBackgroundColor({ color: "#FF5733" });
  };