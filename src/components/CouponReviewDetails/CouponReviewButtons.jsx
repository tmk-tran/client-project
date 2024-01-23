import React from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Button } from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { modalBtnStyle } from "../Utils/helpers";
// ~~~~~~~~~~ Icons ~~~~~~~~~~
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

export default function CouponReviewButtons() {
  const hoverDeny = {
    "&:hover": {
      backgroundColor: "#A42626", // Lighter shade for Deny button
    },
  };

  const hoverAccept = {
    "&:hover": {
      backgroundColor: "#22A422", // Lighter shade for Accept button
    },
  };

  return (
    <div style={modalBtnStyle}>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#8E1919", width: "10vw", ...hoverDeny }}
      >
        Deny &nbsp;
        <CancelIcon />
      </Button>
      <Button
        sx={{
          backgroundColor: "#198E19",
          color: "white",
          width: "10vw",
          ...hoverAccept,
        }}
      >
        <CheckIcon />
        &nbsp; Accept
      </Button>
    </div>
  );
}
