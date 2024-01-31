import React, { useState } from "react";
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

export default function CouponStatusDropdown({ width = "100%", handleUpdateTask }) {
  const [status, setStatus] = useState("");
  const [isTaskUpdate, setIsTaskUpdate] = useState(false);
  console.log(isTaskUpdate);

  const handleMenuChange = (event) => {
    const choice = event.target.value;
    setStatus(choice);
    setIsTaskUpdate(true);

    // Pass both the selected status and isTaskUpdate state to the parent
    handleUpdateTask(choice, isTaskUpdate);
  };

  return (
    <Select
      value={status}
      // onChange={handleMenuChange}
      onChange={(event) => {
        handleMenuChange(event);
        handleUpdateTask(); // Call the parent function here
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
      <MenuItem value="" disabled>
        Change Status
      </MenuItem>
      {statusOptions.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}
