// logic/TaskManager.js
import { saveTasks, saveLastTask } from "./Storage";
import { showNotification } from "./Notification";

export const addTask = (newTask, tasks, setTasks, setLastTask) => {
  if (newTask.trim() === "") return tasks;
  const updatedTasks = [...tasks, { text: newTask, completed: false }];
  setTasks(updatedTasks);
  setLastTask(newTask);
  saveTasks(updatedTasks);
  saveLastTask(newTask);
  showNotification(`Added: "${newTask}"`);
  return updatedTasks;
};

export const deleteTask = (index, tasks, setTasks) => {
  const updatedTasks = tasks.filter((_, i) => i !== index);
  setTasks(updatedTasks);
  saveTasks(updatedTasks);
  showNotification(`Deleted: "${tasks[index].text}"`);
  return updatedTasks;
};

export const toggleTaskCompletion = (index, tasks, setTasks) => {
  const updatedTasks = tasks.map((task, i) =>
    i === index ? { ...task, completed: !task.completed } : task
  );
  setTasks(updatedTasks);
  saveTasks(updatedTasks);
};