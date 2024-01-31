import React, { useState } from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Button } from "@mui/material";
import { errorColor, successColor } from "../Utils/colors";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { modalBtnStyle } from "../Utils/helpers";
// ~~~~~~~~~~ Icons ~~~~~~~~~~
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import { useAlert } from "../SuccessAlert/useAlert";
export default function CouponReviewButtons({
  onDenyButtonClick,
  isTaskUpdate,
  updateTaskState,
}) {
  console.log(isTaskUpdate);

  const { isAlertOpen, handleAlertClose, handleTaskUpdate } = useAlert();

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

  const handleUpdateClick = () => {
    // Perform any necessary actions in the child component
    handleTaskUpdate();
    // Update the state in the parent component
    updateTaskState(false);
  };

  return (
    <div style={modalBtnStyle}>
      <SuccessAlert isOpen={isAlertOpen} onClose={handleAlertClose} />

      {isTaskUpdate ? (
        <Button onClick={handleUpdateClick} sx={{ backgroundColor: successColor.color, ...hoverAccept }} variant="contained" fullWidth>
          Update
        </Button>
      ) : (
        <>
          <Button
            variant="contained"
            sx={{
              width: "10vw",
              ...hoverDeny,
              backgroundColor: errorColor.color,
            }}
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
        </>
      )}
    </div>
  );
}
