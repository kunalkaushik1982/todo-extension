// ui/TaskList.jsx
import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, toggleTaskCompletion, deleteTask }) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} index={index} toggleTaskCompletion={toggleTaskCompletion} deleteTask={deleteTask} />
      ))}
    </ul>
  );
}

export default TaskList;