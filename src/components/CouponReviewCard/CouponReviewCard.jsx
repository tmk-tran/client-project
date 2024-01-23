import React, { useState } from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import {
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { border } from "../Utils/colors";
// ~~~~~~~~~~ Component ~~~~~~~~~~
import CommentDisplay from "../CommentDisplay/CommentDisplay";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { historyHook } from "../../hooks/useHistory";
import CouponStatusDropdown from "../CouponStatusDropdown/CouponStatusDropdown";

export default function CouponReviewCard() {
  const history = historyHook();

  const handleUpdateClick = (event) => {
    // Add your logic for the Update button click
    // ...

    // Prevent the click event from propagating to the Card and triggering history.push
    event.stopPropagation();
  };

  const handleContainerClick = (event) => {
    // Prevent the click event from propagating to the Card and triggering history.push
    event.stopPropagation();
  };

  return (
    <Card
      elevation={6}
      className="details-view-card"
      onClick={() => {
        history.push(`/coupon/${1}`);
      }}
    >
      <CardContent>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "20px",
          }}
          onClick={handleContainerClick}
        >
          
          <CouponStatusDropdown />

          <Button sx={{ marginLeft: "10px" }} onClick={handleUpdateClick}>
            Update
          </Button>
        </div>

        <hr />

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
