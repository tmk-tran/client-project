import React, { useState } from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Typography, MenuItem, Select } from "@mui/material";
import "./TaskList.css";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import TaskCardOrg from "../TaskCard/TaskCardOrg";

export default function TaskListOrg() {
  // State to manage the selected tasks in each category
  const [newTask, setNewTask] = useState("");
  const [inProgressTask, setInProgressTask] = useState("");
  const [completeTask, setCompleteTask] = useState("");

  // Mock data for tasks in different categories
  const newTasks = ["Task 1", "Task 2", "Task 3"];
  const inProgressTasks = ["Task 4", "Task 5"];
  const completeTasks = ["Task 6", "Task 7", "Task 8"];

  const getNumOptions = (tasks) => tasks.filter(Boolean).length;

  return (
    <div className="list-container">
      {/* Dropdown for New Tasks */}
      <Select
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        displayEmpty
        renderValue={() => (
          <Typography style={{ display: "flex", alignItems: "center" }}>
            New ({getNumOptions(newTasks)})
          </Typography>
        )}
      >
        {newTasks.map((task) => (
          <MenuItem key={task} value={task}>
            {task}
            <TaskCardOrg newTask={newTask} />
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
            In Progress ({getNumOptions(inProgressTasks)})
          </Typography>
        )}
      >
        {inProgressTasks.map((task) => (
          <MenuItem key={task} value={task}>
            {task}
            <TaskCardOrg inProgressTask={inProgressTask} />
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
            Complete ({getNumOptions(completeTasks)})
          </Typography>
        )}
      >
        {completeTasks.map((task) => (
          <MenuItem key={task} value={task}>
            {task}
            <TaskCardOrg completeTask={completeTask} />
          </MenuItem>
        ))}
      </Select>

      {/* Additional UI to display selected task details or move tasks between categories */}
      {/* Add your code here */}
    </div>
  );
}
