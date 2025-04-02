import React, { useState, useEffect } from "react";
import TaskList from "./ui/TaskList";
import TaskInput from "./ui/TaskInput";
import { getStoredTasks, saveTasks, getLastTask, saveLastTask } from "./logic/Storage";
import { showNotification } from "./logic/Notification";
import { addTask, deleteTask, toggleTaskCompletion } from "./logic/TaskManager";
import { updateBadge } from "./logic/BadgeManager";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [lastTask, setLastTask] = useState(null);

  useEffect(() => {
    getStoredTasks(setTasks);
    getLastTask(setLastTask);
  }, []);

  const handleAddTask = (newTask) => {
    const updatedTasks = addTask(newTask, tasks, setTasks, setLastTask);
    updateBadge(updatedTasks.length);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = deleteTask(index, tasks, setTasks);
    updateBadge(updatedTasks.length);
  };

  const handleToggleTaskCompletion = (index) => {
    toggleTaskCompletion(index, tasks, setTasks);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "300px" }}>
      <h2>To-Do List</h2>
      <TaskInput addTask={handleAddTask} />
      <TaskList tasks={tasks} toggleTaskCompletion={handleToggleTaskCompletion} deleteTask={handleDeleteTask} />
      {lastTask && (
        <div style={{ marginTop: "20px", fontWeight: "bold" }}>
          Last Added Task: {lastTask}
        </div>
      )}
    </div>
  );
}

export default Todo;