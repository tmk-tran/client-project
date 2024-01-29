import React, { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const taskOptions = ["New", "In Progress", "Complete"];

export default function TaskDropdown({ onChange, taskStatus }) {
  const [status, setStatus] = useState("");
  console.log(taskStatus);
  console.log(status);

  useEffect(() => {
    setStatus(taskStatus);
  }, [taskStatus]);

  const handleMenuChange = (event) => {
    const choice = event.target.value;
    setStatus(choice);

    // Call the onChange callback with the selected task
    onChange(choice);
  };

  return (
    <FormControl>
      <InputLabel sx={{ mt: 1 }}>Status</InputLabel>
        <Select
          value={status}
          onChange={handleMenuChange}
          displayEmpty
          sx={{ width: "10vw", mt:3 }}
        >
          <MenuItem value="" disabled>
            Task Status...
          </MenuItem>
          {taskOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
    </FormControl>
  );
}
