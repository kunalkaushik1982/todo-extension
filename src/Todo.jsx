import React, { useState, useEffect } from "react";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from Chrome storage when the component mounts
  useEffect(() => {
    chrome.storage.local.get(["tasks"], (result) => {
      if (result.tasks) {
        setTasks(result.tasks);
        updateBadge(result.tasks.length);
      }
    });
  }, []);

  // Function to show notifications
  const showNotification = (message) => {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon-48.png",
      title: "To-Do List",
      message: message,
    });
  };

  // Function to save tasks and update badge count
  const saveTasksToStorage = (updatedTasks) => {
    chrome.storage.local.set({ tasks: updatedTasks });
    updateBadge(updatedTasks.length);
  };

  // Function to update the badge count
  const updateBadge = (count) => {
    chrome.action.setBadgeText({ text: count > 0 ? count.toString() : "" });
    chrome.action.setBadgeBackgroundColor({ color: "#FF5733" });
  };

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
    showNotification(`Added: "${newTask}"`);
    setNewTask("");
  };

  // Function to delete a task
  const deleteTask = (index) => {
    const taskToDelete = tasks[index];
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
    showNotification(`Deleted: "${taskToDelete}"`);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "300px" }}>
      <h2>To-Do List</h2>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task} <button onClick={() => deleteTask(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
