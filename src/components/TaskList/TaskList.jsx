import React, { useState } from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Typography, MenuItem, Select } from "@mui/material";
import "./TaskList.css";

export default function TaskList() {
  // State to manage the selected tasks in each category
  const [newTask, setNewTask] = useState("");
  const [inProgressTask, setInProgressTask] = useState("");
  const [completeTask, setCompleteTask] = useState("");

  // Mock data for tasks in different categories
  const newTasks = ["Task 1", "Task 2", "Task 3"];
  const inProgressTasks = ["Task 4", "Task 5"];
  const completeTasks = ["Task 6", "Task 7", "Task 8"];

  return (
    <div className="list-container">
      {/* Dropdown for New Tasks */}
      <Select
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        displayEmpty
        renderValue={() => (
          <Typography style={{ display: "flex", alignItems: "center" }}>
            New
          </Typography>
        )}
      >
        {newTasks.map((task) => (
          <MenuItem key={task} value={task}>
            {task}
          </MenuItem>
        ))}
      </Select>

      {/* Dropdown for In Progress Tasks */}
      <Select
        value={inProgressTask}
        onChange={(e) => setInProgressTask(e.target.value)}
        displayEmpty
        renderValue={() => (
          <Typography style={{ display: "flex", alignItems: "center" }}>
            In Progress
          </Typography>
        )}
      >
        {inProgressTasks.map((task) => (
          <MenuItem key={task} value={task}>
            {task}
          </MenuItem>
        ))}
      </Select>

      {/* Dropdown for Complete Tasks */}
      <Select
        value={completeTask}
        onChange={(e) => setCompleteTask(e.target.value)}
        displayEmpty
        renderValue={() => (
          <Typography style={{ display: "flex", alignItems: "center" }}>
            Complete
          </Typography>
        )}
      >
        {completeTasks.map((task) => (
          <MenuItem key={task} value={task}>
            {task}
          </MenuItem>
        ))}
      </Select>

      {/* Additional UI to display selected task details or move tasks between categories */}
      {/* Add your code here */}
    </div>
  );
}
