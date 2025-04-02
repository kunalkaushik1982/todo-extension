// ui/TaskItem.jsx
import React from "react";

function TaskItem({ task, index, toggleTaskCompletion, deleteTask }) {
  return (
    <li style={{ textDecoration: task.completed ? "line-through" : "none" }}>
      <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(index)} />
      {task.text}
      <button onClick={() => deleteTask(index)}>❌</button>
    </li>
  );
}

export default TaskItem;