import React from "react";
import { Alert, Snackbar } from "@mui/material";

export default function SuccessAlert({ isOpen, onClose, caseType }) {
  console.log(caseType);
  // isOpen: whether the alert is open or not
  // onClose: callback to handle closing the alert

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} // Set the position to top-center
    >
      {caseType === "NewTask" ? (
        <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
          New Task Created!
        </Alert>
      ) : caseType === "NewComment" ? (
        <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
          New Comment Added!
        </Alert>
      ) : caseType === "CompletedCoupon" ? (
        <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
          Coupon Task Complete!
        </Alert>
      ) : caseType === "Archived" ? (
        <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
          Task has been successfully archived!
        </Alert>
      ) : caseType === "New Location" ? (
        <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
          New location Added!
        </Alert>
      ) : caseType === "Delete Location" ? (
        <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
          Location Deleted!
        </Alert>
      ) : caseType === "New Coupon" ? (
        <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
          New Coupon Added!
        </Alert>
      ) : caseType === "Edit Location" ? (
        <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
          Location Edited!
        </Alert>
      ) : caseType === "Cash" ? (
        <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
          Cash Updated!
        </Alert>
      ) : caseType === "Checks" ? (
        <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
          Checks Updated!
        </Alert>
      ) : caseType === "Donations" ? (
        <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
          Donations Updated!
        </Alert>
      ) : (
        <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
          Task status has been successfully changed!
        </Alert>
      )}
    </Snackbar>
  );
}
