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

  const indent = {
    marginLeft: "18vw ",
  };

  // const getNumOptions = (tasks) => tasks.filter(Boolean).length;

  const handleChange = (category, task) => {
    setSelectedTasks((prevSelectedTasks) => ({
      ...prevSelectedTasks,
      [category]: task,
    }));
  };

  // Assuming store.merchantTasks is an array of tasks
  const merchantTasks = mTasks() || [];

  // Group tasks by task_status (case-insensitive)
  const tasksByStatus = merchantTasks.reduce((acc, task) => {
    const statusKey = task.task_status.toLowerCase();
    acc[statusKey] = acc[statusKey] || [];
    acc[statusKey].push(task);
    return acc;
  }, {});

  // Sort tasks within each category
  const sortedNewTasks = tasksByStatus["new"] || [];
  console.log(sortedNewTasks);
  const sortedInProgressTasks = tasksByStatus["in progress"] || [];
  const sortedCompleteTasks = tasksByStatus["complete"] || [];

  return (
    <div className="list-container">
      {/* Dropdown for New Tasks */}
      <Select
        value={selectedTasks.newTask}
        onChange={(e) =>
          setSelectedTasks({ ...selectedTasks, newTask: e.target.value })
        }
        displayEmpty
        renderValue={() => (
          <Typography
            sx={{...indent, fontWeight: "bold" }}
          >{`New (${sortedNewTasks.length})`}</Typography>
        )}
      >
        {sortedNewTasks.map((task, i) => (
          <MenuItem key={task.id} value={i + 1}>
            {/* Display the task number along with task information */}
            <Typography variant="h6">{`#${i + 1} - `}&nbsp;</Typography>
            <TaskCardMerchant task={task} />
          </MenuItem>
        ))}
      </Select>

      {/* Dropdown for In Progress Tasks */}
      <Select
        value={selectedTasks.inProgressTask}
        onChange={(e) =>
          setSelectedTasks({ ...selectedTasks, inProgressTask: e.target.value })
        }
        displayEmpty
        renderValue={() => (
          <Typography sx={indent}>
            {`In Progress (${sortedInProgressTasks.length})`}
          </Typography>
        )}
      >
        {sortedInProgressTasks.map((task, i) => (
          <MenuItem key={task.id} value={i + 1}>
            <Typography variant="h6">{`#${i + 1} - `}&nbsp;</Typography>
            <TaskCardMerchant task={task} />
          </MenuItem>
        ))}
      </Select>

      {/* Dropdown for Complete Tasks */}
      <Select
        value={selectedTasks.completeTask}
        onChange={(e) =>
          setSelectedTasks({ ...selectedTasks, completeTask: e.target.value })
        }
        displayEmpty
        renderValue={() => (
          <Typography
            sx={{ ml: "18vw" }}
          >{`Complete (${sortedCompleteTasks.length})`}</Typography>
        )}
      >
        {sortedCompleteTasks.map((task, i) => (
          <MenuItem key={task.id} value={i + 1}>
            <Typography variant="h6">{`#${i + 1} - `}&nbsp;</Typography>
            <TaskCardMerchant task={task} />
          </MenuItem>
        ))}
      </Select>

      {/* Additional UI to display selected task details or move tasks between categories */}
      {/* Add your code here */}
    </div>
  );
}
