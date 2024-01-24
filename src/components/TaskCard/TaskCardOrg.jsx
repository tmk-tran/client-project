import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { historyHook } from "../../hooks/useHistory";

const taskOptions = ["New", "In Progress", "Complete"];

export default function TaskCardOrg() {
  const [status, setStatus] = useState("");

  const history = historyHook();

  const handleMenuChange = (event) => {
    const choice = event.target.value;
    setStatus(choice);
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

            <div style={{ border: "1px solid red" }}>
              <div>Most Recent Comment Here</div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              {/* NEED to add an ID here to associate to specific task on next view */}
              <Button
                variant="contained"
                onClick={() => history.push(`/orgtaskdetails/${1}`)}
              >
                Details
              </Button>

              {/* <Select value={status} onChange={handleMenuChange} displayEmpty>
                <MenuItem value="" disabled>
                  Task Status
                </MenuItem>
                {taskOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select> */}

            </div>
          </div>

          <div className="task-description-section">
            Short description of task, entered during creation
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button fullWidth>Update</Button>
          </div>
          
        </div>
      </CardContent>
    </Card>
  );
}
