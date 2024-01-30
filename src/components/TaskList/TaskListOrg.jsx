import React, { useState } from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Typography, MenuItem, Select, Box } from "@mui/material";
import "./TaskList.css";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import TaskCard from "../TaskCard/TaskCard";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { oTasks } from "../../hooks/reduxStore";

// ERRORS ARE  HERE FOR <DIV> CANNOT APPEAR AS DESCENDANT OF <P>

export default function TaskListOrg() {
  const [selectedTasks, setSelectedTasks] = useState({
    newTask: "",
    inProgressTask: "",
    completeTask: "",
  });
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Handler to close the alert
  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  // Handler to be called when the task is updated
  const handleTaskUpdate = () => {
    // Additional logic if needed
    setIsAlertOpen(true);
  };

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

  return (
    <Box className="list-container">
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~ Dropdown for New Tasks ~~~~~~~~ */}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
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
            <TaskCard
              task={task}
              taskType="organization"
              index={i}
              onTaskUpdate={handleTaskUpdate}
            />
          </MenuItem>
        ))}
      </Select>
      {/* ~~~~~~~~~~~~~~~~ END ~~~~~~~~~~~~~~~~~~~~ */}

      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~ Dropdown for In Progress Tasks ~~~~~~~~ */}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
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
            <TaskCard
              task={task}
              taskType="organization"
              index={i}
              onTaskUpdate={handleTaskUpdate}
            />
          </MenuItem>
        ))}
      </Select>
      {/* ~~~~~~~~~~~~~~~~ END ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~ Dropdown for Complete Tasks ~~~~~~~~ */}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <SuccessAlert isOpen={isAlertOpen} onClose={handleAlertClose} />
      <Select
        value={selectedTasks.completeTask}
        onChange={(e) =>
          setSelectedTasks({ ...selectedTasks, completeTask: e.target.value })
        }
        displayEmpty
        renderValue={() => {
          const nonDeletedTasks = sortedCompleteTasks.filter(
            (task) => !task.is_deleted
          );
          return (
            <Typography>
              {"Complete"}&nbsp;
              {`(${nonDeletedTasks.length})`}
            </Typography>
          );
        }}
      >
        {sortedCompleteTasks
          .filter((task) => !task.is_deleted)
          .map((task, i) =>
            !task.is_deleted ? (
              <MenuItem key={task.id} value={i + 1} disableRipple>
                <Typography variant="h6">{`#${i + 1} - `}&nbsp;</Typography>
                <TaskCard
                  id={task.id}
                  task={task}
                  taskType="organization"
                  index={i}
                  onTaskUpdate={handleTaskUpdate}
                />
              </MenuItem>
            ) : null
          )}
      </Select>
      {/* ~~~~~~~~~~~~~~~~ END ~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* Additional UI to display selected task details or move tasks between categories */}
    </Box>
  );
}
