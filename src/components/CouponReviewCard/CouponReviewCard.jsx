import React, { useState } from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import {
  Button,
  Card,
  CardContent,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@mui/material";
import { border } from "../Utils/colors";
// ~~~~~~~~~~ Component ~~~~~~~~~~
import CommentDisplay from "../CommentDisplay/CommentDisplay";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { historyHook } from "../../hooks/useHistory";

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

export default function CouponReviewCard() {
  const history = historyHook();

  const [status, setStatus] = useState("");

  const handleMenuChange = (event) => {
    const choice = event.target.value;
    setStatus(choice);
  };

  return (
    <Card elevation={6} className="details-view-card" onClick={() => {history.push(`/coupon/${1}`)}}>
      <CardContent>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "20px",
          }}
        >
          <Select
            value={status}
            onChange={handleMenuChange}
            style={{
              width: "100%",
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
          <Button sx={{ marginLeft: "10px" }}>Update</Button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          {/* REMOVE BORDERS AND PLACEHOLDERS UPON HOOKUP TO DB ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          <div style={border}>
            <div
              style={{
                height: "15vh",
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ textAlign: "center", lineHeight: "15vh" }}>
                Front of Coupon
              </Typography>
            </div>
          </div>

          <div style={border}>
            <div
              style={{
                height: "15vh",
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ textAlign: "center", lineHeight: "15vh" }}>
                Back of Coupon
              </Typography>
            </div>
          </div>

          <div style={border}>
            <div
              style={{
                height: "10vh",
                backgroundColor: "rgba(96, 96, 96, 0.1)",
              }}
            >
              <Typography
                variant="body2"
                sx={{ textAlign: "center", lineHeight: "10vh" }}
              >
                Details of Coupon
              </Typography>
            </div>
          </div>

          <div style={border}>
            <CommentDisplay />
          </div>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        </div>
      </CardContent>
    </Card>
  );
}
