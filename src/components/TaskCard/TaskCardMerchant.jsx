import React, { useState } from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Card, CardContent, Typography, Button } from "@mui/material";
import "./TaskCard.css";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { historyHook } from "../../hooks/useHistory";
import { successColor, hoverAccept } from "../Utils/colors";
import { formatDate } from "../Utils/helpers";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import TaskDropdown from "./TaskDropdown";

export default function TaskCardMerchant({ task }) {
  console.log(task);
  const [selectedTask, setSelectedTask] = useState(null);

  const history = historyHook();

  const handleTaskChange = (taskStatus) => {
    setSelectedTask(taskStatus); // Update selectedTask with the value received from TaskDropdown
  };

  const handleCardClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Card style={{ width: "100%" }} onClick={handleCardClick}>
      <CardContent>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ border: "1px solid red" }}>
              <div className="name-section">
                <Typography sx={{ fontWeight: "bold" }}>
                  Merchant Name
                </Typography>
                <div>Due: {formatDate(task.due_date)}</div>
              </div>
            </div>

            <div style={{ border: "1px solid red" }}>
              {/* <div>Status of Development</div> */}
              Task: {task.task}
              <div className="task-description-section">
                {/* Short description of task, entered during creation */}
                Details: {task.description}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* NEED to add an ID here to associate to specific task on next view */}
              {selectedTask ? (
                <Button
                  variant="contained"
                  onClick={() =>
                    console.log("Update clicked for", selectedTask)
                  }
                  sx={{ backgroundColor: successColor.color, ...hoverAccept }}
                  fullWidth
                >
                  Update
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => history.push(`/merchantTaskDetails/${1}`)}
                  fullWidth
                >
                  Details
                </Button>
              )}

              <TaskDropdown onChange={handleTaskChange} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
