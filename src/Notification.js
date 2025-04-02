// Notification.js
export const showNotification = (message) => {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon-48.png",
      title: "To-Do List",
      message: message,
    });
  };