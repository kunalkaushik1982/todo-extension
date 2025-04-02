// logic/Storage.js
export const getStoredTasks = (setTasks) => {
    chrome.storage.local.get(["tasks"], (result) => {
      if (result.tasks) setTasks(result.tasks);
    });
  };
  
  export const saveTasks = (tasks) => {
    chrome.storage.local.set({ tasks });
  };
  
  export const getLastTask = (setLastTask) => {
    chrome.storage.local.get(["lastTask"], (result) => {
      if (result.lastTask) setLastTask(result.lastTask);
    });
  };
  
  export const saveLastTask = (task) => {
    chrome.storage.local.set({ lastTask: task });
  };