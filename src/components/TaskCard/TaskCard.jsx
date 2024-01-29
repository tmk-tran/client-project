import React, { useState } from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Card, CardContent, Typography, Button } from "@mui/material";
import "./TaskCard.css";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { historyHook } from "../../hooks/useHistory";
import { successColor, hoverAccept, border } from "../Utils/colors";
import {
  capitalizeFirstWord,
  capitalizeWords,
  formatDate,
} from "../Utils/helpers";
import { dueDateHighlight } from "../Utils/colors";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import TaskDropdown from "./TaskDropdown";
import CommentDisplay from "../CommentDisplay/CommentDisplay";
import { dispatchHook } from "../../hooks/useDispatch";

export default function TaskCardMerchant({ task, taskType, index }) {
  console.log(taskType);
  const [selectedTask, setSelectedTask] = useState(null);
  console.log(selectedTask);
  console.log(task);
  console.log(index);

  const history = historyHook();
  const dispatch = dispatchHook();

  const handleTaskChange = (taskStatus) => {
    setSelectedTask(taskStatus); // Update selectedTask with the value received from TaskDropdown
  };

  const handleCardClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleTaskUpdate = () => {
    const updateActionType =
      taskType === "organization"
        ? "UPDATE_ORGANIZATION_TASK"
        : "UPDATE_MERCHANT_TASK";

    console.log(updateActionType);
    console.log(task.id);
    console.log(selectedTask);
    dispatch({
      type: updateActionType,
      payload: {
        id: task.id,
        task_status: selectedTask,
      },
    });
  };

  const fullWidth = {
    width: "100%",
  };

  const flexColumn = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <Card
      elevation={5}
      style={{
        backgroundColor: index % 2 === 0 ? "white" : "#e9e9e9bf",
        ...fullWidth,
      }}
      onClick={handleCardClick}
    >
      <CardContent>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                ...flexColumn,
                ...fullWidth,
              }}
            >
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* ~~~~~~~~~~~~~ MERCHANT / ORG NAME ~~~~~~~~~~~~~ */}
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{
                    // fontWeight: "bold",
                    fontSize: "larger",
                    // textAlign: "center",
                    mb: 1,
                  }}
                >
                  <strong>
                    {taskType === "organization" ? "Organization" : "Merchant"}:{" "}
                  </strong>
                  {capitalizeWords(
                    taskType === "organization"
                      ? task.organization_name
                      : task.merchant_name
                  )}
                </Typography>

                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                {/* ~~~~~~~~~~~~~~~~ DATE ~~~~~~~~~~~~~~~~~~~~ */}
                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                <div style={dueDateHighlight}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      width: "10vw",
                      textAlign: "center",
                      mt: 0.5,
                    }}
                  >
                    Due: {formatDate(task.due_date)}
                  </Typography>
                </div>
                {/* ~~~~~~~~~~~~~~~~ END ~~~~~~~~~~~~~~~~~~~~ */}
                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              </div>
              {/* May use border here, undecided */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                  {/* ~~~~~~~~~~~~~~~~~ TASK ~~~~~~~~~~~~~~~~~ */}
                  {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                  <div>
                    <Typography sx={{ fontSize: "larger" }}>
                      <strong>Task: </strong> {capitalizeWords(task.task)}
                    </Typography>
                  </div>{" "}
                  {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                  {/* ~~~~~~~~~~~~~~~~~ ASSIGNED ~~~~~~~~~~~~~~~~~ */}
                  {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                  <div>
                    <Typography sx={{ width: "10vw", textAlign: "center" }}>
                      <strong>Assigned to: </strong>
                      {task.assign}
                    </Typography>
                  </div>
                </div>
                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                {/* ~~~~~~~~~~~~~ DESCRIPTION ~~~~~~~~~~~~~ */}
                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                <div>
                  {task.description ? (
                    <Typography sx={{ mb: 1, mt: 1 }}>
                      <strong>Details: </strong>{" "}
                      {capitalizeFirstWord(task.description)}
                    </Typography>
                  ) : (
                    <Typography sx={{ mb: 1, mt: 1 }}>
                      <strong>No details available</strong>
                    </Typography>
                  )}
                </div>
                {/* ~~~~~~~~~~~~~~~~ END~~~~~~~~~~~~~~~~~~~~ */}
                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              </div>
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* ~~~~~~~~~~~~~ COMMENTS SECTION ~~~~~~~~~~~~~ */}
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              <div style={border}>
                <CommentDisplay />
              </div>
              {/* ~~~~~~~~~~~~~~~~ END~~~~~~~~~~~~~~~~~~~~ */}
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            </div>

            <div
              style={{
                ...flexColumn,
                alignItems: "center",
                marginLeft: "20px",
              }}
            >
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* ~~~~~~~~~~~~~ UPDATE TASK ~~~~~~~~~~~~~ */}
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

              {selectedTask ? (
                <Button
                  variant="contained"
                  onClick={handleTaskUpdate}
                  sx={{
                    backgroundColor: successColor.color,
                    ...hoverAccept,
                    height: "30%",
                    mb: 5,
                  }}
                  fullWidth
                >
                  Update
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() =>
                    history.push(
                      `/${
                        taskType === "organization"
                          ? "organizationTaskDetails"
                          : "merchantTaskDetails"
                      }/${
                        taskType === "organization"
                          ? task.organization_id
                          : task.merchant_id
                      }`
                    )
                  }
                  fullWidth
                  // sx={{ height: "100%" }}
                  sx={{ height: "30%", mb: 5 }}
                >
                  Details
                </Button>
              )}
              {/* ~~~~~~~~~~~~~~~~ END~~~~~~~~~~~~~~~~~~~~ */}
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

              <TaskDropdown
                onChange={handleTaskChange}
                taskStatus={task.task_status}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
