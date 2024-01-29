import React, { useState, useEffect } from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Typography, MenuItem, Select, Box } from "@mui/material";
import "./TaskList.css";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import TaskCard from "../TaskCard/TaskCard";
import { oTasks } from "../../hooks/reduxStore";
import { dispatchHook } from "../../hooks/useDispatch";

// ERRORS ARE  HERE FOR <DIV> CANNOT APPEAR AS DESCENDANT OF <P>

export default function TaskListOrg() {
  const dispatch = dispatchHook();
  const [selectedTasks, setSelectedTasks] = useState({
    newTask: "",
    inProgressTask: "",
    completeTask: "",
  });

  // Mock data for tasks in different categories
  // const newTasks = ["Task 1", "Task 2", "Task 3"];
  // const inProgressTasks = ["Task 4", "Task 5"];
  // const completeTasks = ["Task 6", "Task 7", "Task 8"];

  // const getNumOptions = (tasks) => tasks.filter(Boolean).length;

  const orgTasks = oTasks() || [];
  console.log(orgTasks);

  // Group tasks by task_status (case-insensitive)
  // Check if orgTasks is an array before using reduce
  const tasksByStatus = Array.isArray(orgTasks)
    ? orgTasks.reduce((acc, task) => {
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

  // useEffect(() => {
  //   dispatch({ type: "FETCH_ALL_ORGANIZATION_TASKS" });
  // }, [oTasks]);

  return (
    <Box className="list-container">
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
        MenuProps={{ disableAutoFocusItem: true }}
      >
        {sortedNewTasks.map((task, i) => (
          <MenuItem key={task.id} value={i + 1} disableRipple>
            {/* Display the task number along with task information */}
            <Typography variant="h6">{`#${i + 1} - `}&nbsp;</Typography>
            <TaskCard task={task} taskType="organization" />
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
          <MenuItem key={task.id} value={i + 1} disableRipple>
            <Typography variant="h6">{`#${i + 1} - `}&nbsp;</Typography>
            <TaskCard task={task} />
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
          <MenuItem key={task.id} value={i + 1} disableRipple>
            <Typography variant="h6">{`#${i + 1} - `}&nbsp;</Typography>
            <TaskCard task={task} />
          </MenuItem>
        ))}
      </Select>

      {/* Additional UI to display selected task details or move tasks between categories */}
      {/* Add your code here */}
    </Box>
  );
}
