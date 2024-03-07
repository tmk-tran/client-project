import React, { useState } from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Button } from "@mui/material";
import { errorColor, successColor } from "../Utils/colors";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { border } from "../Utils/colors";
// ~~~~~~~~~~ Icons ~~~~~~~~~~
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import { useAlert } from "../SuccessAlert/useAlert";
import { flexRowSpace } from "../Utils/pageStyles";
export default function CouponReviewButtons({
  onDenyButtonClick,
  isTaskUpdate,
  updateTaskState,
  changesRequested,
  completedCoupon,
}) {
  console.log(isTaskUpdate);
  console.log(changesRequested);
  console.log(completedCoupon);

  const { isAlertOpen, handleAlertClose, handleTaskUpdate } = useAlert();
  const [isCompletedCoupon, setIsCompletedCoupon] = useState(false);

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

  const cancelButton = {
    backgroundColor: errorColor.color,
  };

  const buttonWidth = {
    width: "40%",
  };

  const handleCancelClick = () => {
    updateTaskState(false);
  };

  const handleUpdateClick = () => {
    // Perform any necessary actions in the child component
    handleTaskUpdate();

    completedCoupon ? setIsCompletedCoupon(true) : setIsCompletedCoupon(false);

    // Update the state in the parent component
    updateTaskState(false);
  };

  return (
    <div style={flexRowSpace}>
      {isCompletedCoupon && (
        <SuccessAlert
          isOpen={isAlertOpen}
          onClose={handleAlertClose}
          caseType="CompletedCoupon"
        />
      )}

      {isTaskUpdate ? (
        <>
          <Button
            onClick={handleCancelClick}
            variant="contained"
            sx={{ ...cancelButton, ...hoverDeny, ...buttonWidth }}
          >
            Cancel
          </Button>
          <Button
            onClick={!changesRequested ? handleUpdateClick : handleDenyClick}
            sx={{
              backgroundColor: successColor.color,
              ...hoverAccept,
              ...buttonWidth,
            }}
            variant="contained"
          >
            {completedCoupon ? "Complete" : "Update"}
          </Button>
        </>
      ) : (
        // <div style={{ height: "4vh", ...border }}></div>
        <>
          {/* <Button
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
          </Button> */}

          <Button variant="contained" sx={buttonWidth} disabled>
            Cancel
          </Button>
          <Button
            sx={{ ...buttonWidth }}
            variant="contained"
            disabled
            fullWidth
          >
            Update
          </Button>
        </>
      )}
    </div>
  );
}
