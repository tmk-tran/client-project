import React, { useState } from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import {
  Card,
  CardContent,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@mui/material";
import { border } from "../Utils/colors";

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

// const statusOptions = {
//   New: ["Initial Contact", "Follow Up Call/Email/Text", "Follow Up Visit"],
//   "In Progress": ["Add-on Request", "New Create Proof", "Update Create Proof"],
//   Complete: ["Drop Off Books", "Organization Picking Up Books"],
// };

export default function CouponReviewCard() {
  const [status, setStatus] = useState("");

  const handleMenuChange = (event) => {
    const choice = event.target.value;
    setStatus(choice);
  };

  return (
    <Card elevation={6} id="orgDetails-Card">
      <CardContent>
        <Select
          value={status}
          onChange={handleMenuChange}
          style={{ width: "100%", textAlign: "center", marginLeft: "unset" }}
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

        <div style={border}><div style={{ height: "15vh" }}>Front of Coupon</div></div>
        <div style={border}><div style={{ height: "15vh" }}>Back of Coupon</div></div>
        <div style={border}><div style={{ height: "10vh" }}>Details of Coupon</div></div>    

      </CardContent>
    </Card>
  );
}
