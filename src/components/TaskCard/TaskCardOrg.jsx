import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { historyHook } from "../../hooks/useHistory";
import TaskDropdown from "./TaskDropdown";
import CommentDisplay from "../CommentDisplay/CommentDisplay";
import { successColor, hoverAccept } from "../Utils/colors";

export default function TaskCardOrg() {
  const [selectedTask, setSelectedTask] = useState(null);

  const history = historyHook();

  const handleTaskChange = (task) => {
    setSelectedTask(task); // Update selectedTask with the value received from TaskDropdown
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
                  Organization Name
                </Typography>
              </div>
            </div>

            <div style={{ border: "1px solid red", width: "30vw" }}>
              {/* <div>Most Recent Comment Here</div> */}
              <CommentDisplay />
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
                  onClick={() => history.push(`/orgtaskdetails/${1}`)}
                  fullWidth
                >
                  Details
                </Button>
              )}

              <TaskDropdown onChange={handleTaskChange} />
            </div>
          </div>

          <div className="task-description-section">
            Short description of task, entered during creation
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
