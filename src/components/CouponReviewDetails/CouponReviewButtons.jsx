import React from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Button } from "@mui/material";
import { errorColor, successColor } from "../Utils/colors";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { modalBtnStyle } from "../Utils/helpers";
// ~~~~~~~~~~ Icons ~~~~~~~~~~
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

export default function CouponReviewButtons({ onDenyButtonClick }) {
  const handleDenyClick = () => {
    // Call the parent component's function when the Deny button is clicked
    onDenyButtonClick();
  };

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
        sx={{ width: "10vw", ...hoverDeny, backgroundColor: errorColor.color }}
        onClick={handleDenyClick}
      >
        Deny &nbsp;
        <CancelIcon />
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: successColor.color,
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
