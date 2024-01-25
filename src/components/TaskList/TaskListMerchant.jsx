import React, { useState } from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Typography, MenuItem, Select } from "@mui/material";
import "./TaskList.css";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import TaskCardMerchant from "../TaskCard/TaskCardMerchant";
import { mTasks } from "../../hooks/reduxStore";

export default function TaskListMerchant() {
  // State to manage the selected tasks in each category
  const [newTask, setNewTask] = useState("");
  const [inProgressTask, setInProgressTask] = useState("");
  const [completeTask, setCompleteTask] = useState("");
  const [selectedTasks, setSelectedTasks] = useState({
    newTask: "",
    inProgressTask: "",
    completeTask: "",
  });

  // const getNumOptions = (tasks) => tasks.filter(Boolean).length;

  const handleChange = (category, task) => {
    setSelectedTasks((prevSelectedTasks) => ({
      ...prevSelectedTasks,
      [category]: task,
    }));
  };

  // Assuming store.merchantTasks is an array of tasks
  const merchantTasks = mTasks() || [];
  console.log(merchantTasks);

  // Group tasks by task_status (case-insensitive)
  const tasksByStatus = merchantTasks.reduce((acc, task) => {
    const statusKey = task.task_status.toLowerCase();
    acc[statusKey] = acc[statusKey] || [];
    acc[statusKey].push(task);
    return acc;
  }, {});

  // Sort tasks within each category
  const sortedNewTasks = tasksByStatus["new"] || [];
  const sortedInProgressTasks = tasksByStatus["in progress"] || [];
  const sortedCompleteTasks = tasksByStatus["complete"] || [];

  return (
    // <div className="list-container">
    //   {/* Dropdown for New Tasks */}
    //   <Select
    //     value={newTask}
    //     onChange={(e) => setNewTask(e.target.value)}
    //     displayEmpty
    //     renderValue={() => (
    //       <Typography
    //         style={{
    //           display: "flex",
    //           alignItems: "center",
    //           marginLeft: "18vw",
    //         }}
    //       >
    //         New
    //       </Typography>
    //     )}
    //   >
    //     {newTasks.map((task) => (
    //       <MenuItem key={task} value={task} disableRipple>
    //         {task}
    //         <TaskCardMerchant newTask={newTask} />
    //       </MenuItem>
    //     ))}
    //   </Select>

    //   {/* Dropdown for In Progress Tasks */}
    //   <Select
    //     value={inProgressTask}
    //     onChange={(e) => setInProgressTask(e.target.value)}
    //     displayEmpty
    //     renderValue={() => (
    //       <Typography
    //         style={{
    //           display: "flex",
    //           alignItems: "center",
    //           marginLeft: "18vw",
    //         }}
    //       >
    //         In Progress
    //       </Typography>
    //     )}
    //   >
    //     {inProgressTasks.map((task) => (
    //       <MenuItem key={task} value={task} disableRipple>
    //         {task}
    //         <TaskCardMerchant inProgressTask={inProgressTask} />
    //       </MenuItem>
    //     ))}
    //   </Select>

    //   {/* Dropdown for Complete Tasks */}
    //   <Select
    //     value={completeTask}
    //     onChange={(e) => setCompleteTask(e.target.value)}
    //     displayEmpty
    //     renderValue={() => (
    //       <Typography
    //         style={{
    //           display: "flex",
    //           alignItems: "center",
    //           marginLeft: "18vw",
    //         }}
    //       >
    //         Complete
    //       </Typography>
    //     )}
    //   >
    //     {completeTasks.map((task) => (
    //       <MenuItem key={task} value={task} disableRipple>
    //         {task}
    //         <TaskCardMerchant completeTask={completeTask} />
    //       </MenuItem>
    //     ))}
    //   </Select>

    //   {/* Additional UI to display selected task details or move tasks between categories */}
    //   {/* Add your code here */}
    // </div>

    <div className="list-container">
    {/* Dropdown for New Tasks */}
    <Select
      value={selectedTasks.newTask}
      onChange={(e) => setSelectedTasks({ ...selectedTasks, newTask: e.target.value })}
      displayEmpty
      renderValue={() => (
        <Typography>
          New
        </Typography>
      )}
    >
      {sortedNewTasks.map((task) => (
        <MenuItem key={task.id} value={task.task}>
          {task.task}
          <TaskCardMerchant task={task} />
        </MenuItem>
      ))}
    </Select>

    {/* Dropdown for In Progress Tasks */}
    <Select
      value={selectedTasks.inProgressTask}
      onChange={(e) => setSelectedTasks({ ...selectedTasks, inProgressTask: e.target.value })}
      displayEmpty
      renderValue={() => (
        <Typography>
          In Progress
        </Typography>
      )}
    >
      {sortedInProgressTasks.map((task) => (
        <MenuItem key={task.id} value={task.task}>
          {task.task}
          <TaskCardMerchant task={task} />
        </MenuItem>
      ))}
    </Select>

    {/* Dropdown for Complete Tasks */}
    <Select
      value={selectedTasks.completeTask}
      onChange={(e) => setSelectedTasks({ ...selectedTasks, completeTask: e.target.value })}
      displayEmpty
      renderValue={() => (
        <Typography>
          Complete
        </Typography>
      )}
    >
      {sortedCompleteTasks.map((task) => (
        <MenuItem key={task.id} value={task.task}>
          {task.task}
          <TaskCardMerchant task={task} />
        </MenuItem>
      ))}
    </Select>

    {/* Additional UI to display selected task details or move tasks between categories */}
    {/* Add your code here */}
  </div>

  );
}
