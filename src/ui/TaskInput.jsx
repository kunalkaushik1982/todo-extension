// ui/TaskInput.jsx
import React, { useState } from "react";

function TaskInput({ addTask }) {
  const [newTask, setNewTask] = useState("");

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={() => { addTask(newTask); setNewTask(""); }}>Add</button>
    </div>
  );
}

export default TaskInput;