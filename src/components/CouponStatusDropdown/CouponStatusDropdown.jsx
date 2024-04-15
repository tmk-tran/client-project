import React, { useState, useEffect } from "react";
import { Select, MenuItem } from "@mui/material";

const statusOptions = [
  "*New Year: Merchant Coupon",
  "Add-on Request",
  "Changes Requested",
  "Completed Coupon",
  "Edit Proof",
  "New: Add-on Proof",
  "New: Create Proof",
  "Pending Merchant Approval",
  "Proof Approved",
  "Ready For Review",
  "Update Create Proof",
];

export default function CouponStatusDropdown({
  couponId,
  width = "100%",
  handleUpdateTask,
  onChange,
  complete,
  task,
}) {
  console.log(task);
  const defaultTask = task ? task.task : ""; // Default to an empty string if task is undefined
  console.log(defaultTask);
  const defaultStatus = task ? task.task_status : "";
  console.log(defaultStatus);
  const defaultId = task ? task.id : "";
  console.log(defaultId);


  const [taskStatus, setTaskStatus] = useState(defaultStatus);
  console.log(taskStatus);
  const [status, setStatus] = useState(defaultTask);
  console.log(status);
  const [taskId, setTaskId] = useState(defaultId);
  console.log(taskId);
  
  console.log(couponId);

  useEffect(() => {
    if (defaultTask) {
      setTaskStatus(defaultStatus);
      setStatus(defaultTask);
      setTaskId(defaultId);
    }
  }, [defaultTask, defaultStatus, defaultId]);
  

  const handleMenuChange = (event) => {
    console.log(event.target);
    const choice = event.target.value;
    setStatus(choice);

    if (choice === "Changes Requested") {
      onChange(true); // Call the onChange function with true
    } else {
      onChange(false); // Call the onChange function with false
    }

    if (choice === "Completed Coupon") {
      complete(true); // Call the complete function with true
      setTaskStatus("Complete"); // Set the task_status to "Complete"
    } else {
      complete(false); // Call the complete function with false
    }

    // Pass both the selected status and isTaskUpdate state to the parent
    handleUpdateTask(taskId, choice, taskStatus);
  };

  return (
    <Select
      value={status}
      // onChange={handleMenuChange}
      onChange={(event) => {
        handleMenuChange(event);
      }}
      style={{
        width: width,
        textAlign: "center",
        marginLeft: "unset",
        overflow: "hidden",
        backgroundColor: "white",
      }}
      displayEmpty
    >
      <MenuItem value={status} disabled>
        {status || "Change Status"}
      </MenuItem>
      {statusOptions.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}
