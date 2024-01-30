import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

export default function SuccessAlert({ isOpen, onClose }) {
  // isOpen: whether the alert is open or not
  // onClose: callback to handle closing the alert

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} // Set the position to top-center
    >
      <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
        Task status has been successfully changed!
      </Alert>
    </Snackbar>
  );
}
