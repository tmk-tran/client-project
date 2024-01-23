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

export default function CouponStatusDropdown({ width = "100%" }) {
  const [status, setStatus] = useState("");

  const handleMenuChange = (event) => {
    const choice = event.target.value;
    setStatus(choice);
  };

  return (
    <Select
      value={status}
      onChange={handleMenuChange}
      style={{
        width: width,
        textAlign: "center",
        marginLeft: "unset",
        overflow: "hidden",
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
