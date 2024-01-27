import React, { useState, useEffect } from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Typography, MenuItem, Select } from "@mui/material";
import "./TaskList.css";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import TaskCardMerchant from "../TaskCard/TaskCardMerchant";
import { mTasks } from "../../hooks/reduxStore";
import { dispatchHook } from "../../hooks/useDispatch";

export default function TaskListMerchant() {
  const dispatch = dispatchHook();
  const [selectedTasks, setSelectedTasks] = useState({
    newTask: "",
    inProgressTask: "",
    completeTask: "",
  });

  const handleTaskUpdate = () => {
    dispatch({ type: "FETCH_ALL_MERCHANT_TASKS" }); // Refetch merchant tasks after an update
  };

  // Assuming store.merchantTasks is an array of tasks
  const merchantTasks = mTasks() || [];
  console.log(merchantTasks);

  // // Group tasks by task_status (case-insensitive)
  // const tasksByStatus = merchantTasks.reduce((acc, task) => {
  //   const statusKey = task.task_status.toLowerCase();
  //   acc[statusKey] = acc[statusKey] || [];
  //   acc[statusKey].push(task);
  //   return acc;
  // }, {});

  // Group tasks by task_status (case-insensitive)
  // Check if merchantTasks is an array before using reduce
  const tasksByStatus = Array.isArray(merchantTasks)
    ? merchantTasks.reduce((acc, task) => {
        const statusKey = task.task_status.toLowerCase();
        acc[statusKey] = acc[statusKey] || [];
        acc[statusKey].push(task);
        return acc;
      }, {})
    : {};

  // Sort tasks within each category
  const sortedNewTasks = tasksByStatus["new"] || [];
  const sortedInProgressTasks = tasksByStatus["in progress"] || [];
  const sortedCompleteTasks = tasksByStatus["complete"] || [];

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_MERCHANT_TASKS" });
  }, [mTasks]);

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
          <Typography>
            {"New"}&nbsp;
            {`(${sortedNewTasks.length})`}
          </Typography>
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
          <Typography>
            {"In Progress"}&nbsp;
            {`(${sortedInProgressTasks.length})`}
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
          <Typography>
            {"Complete"}&nbsp;
            {`(${sortedCompleteTasks.length})`}
          </Typography>
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
