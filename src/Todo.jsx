// Todo.jsx
import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import TaskInput from "./TaskInput";
import { getStoredTasks, saveTasks, saveLastTask, getLastTask,updateBadge } from "./Storage";
import { showNotification } from "./Notification";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [lastTask, setLastTask] = useState(null);

  useEffect(() => {
    getStoredTasks(setTasks);
    getLastTask(setLastTask);
  }, []);

  const addTask = (newTask) => {
    if (newTask.trim() === "") return;
    const updatedTasks = [...tasks, { text: newTask, completed: false }];
    setTasks(updatedTasks);
    setLastTask(newTask);
    saveTasks(updatedTasks);
    saveLastTask(newTask);
    updateBadge(updatedTasks.length);  // ✅ Update badge after adding task
    showNotification(`Added: "${newTask}"`);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    updateBadge(updatedTasks.length);  // ✅ Update badge after deleting task
    showNotification(`Deleted: "${tasks[index].text}"`);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "300px" }}>
      <h2>To-Do List</h2>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} deleteTask={deleteTask} />
      {lastTask && (
        <div style={{ marginTop: "20px", fontWeight: "bold" }}>
          Last Added Task: {lastTask}
        </div>
      )}
    </div>
  );
}

export default Todo;