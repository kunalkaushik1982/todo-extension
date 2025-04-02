import React, { useState, useEffect } from "react";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from Chrome storage when the component mounts
  useEffect(() => {
    chrome.storage.local.get(["tasks"], (result) => {
      if (result.tasks) {
        setTasks(result.tasks);
      }
    });
  }, []);

  // Function to save tasks in Chrome storage
  const saveTasksToStorage = (updatedTasks) => {
    chrome.storage.local.set({ tasks: updatedTasks });
  };

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
    setNewTask("");
  };

  // Function to delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
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
