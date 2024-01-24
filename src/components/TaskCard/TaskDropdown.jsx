import React, { useState } from "react";
import { Select, MenuItem } from "@mui/material";

const taskOptions = ["New", "In Progress", "Complete"];

export default function TaskDropdown({ onChange }) {
  const [status, setStatus] = useState("");

  const handleMenuChange = (event) => {
    const choice = event.target.value;
    setStatus(choice);

    // Call the onChange callback with the selected task
    onChange(choice);
  };

  return (
    <Select value={status} onChange={handleMenuChange} displayEmpty sx={{ width: "10vw" }}>
      <MenuItem value="" disabled>
        Move Task
      </MenuItem>
      {taskOptions.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}
