import React from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Typography, TextField, Button } from "@mui/material";
import {
  secondaryColor,
  errorColor,
  successColor,
  border,
} from "../Utils/colors";
// ~~~~~~~~~~ Helpers ~~~~~~~~~~
import { flexCenter } from "../Utils/pageStyles";
import { hoverAccept, hoverDeny } from "../Utils/colors";
// ~~~~~~~~~~ Icons ~~~~~~~~~~
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const DenyProofForm = ({ onClose }) => {
  return (
    <div style={{ height: "100%" }}>
      <div style={{ height: "40%", ...flexCenter }}>
        <div style={flexCenter}>
          <ErrorOutlineIcon sx={{ fontSize: "100px", color: secondaryColor }} />
        </div>
      </div>
      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        Please Enter Reason
      </Typography>
      <TextField
        multiline
        rows={4}
        fullWidth
        label="Comments or coupon changes here..."
        variant="outlined"
        sx={{ mt: 2, mb: 2 }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: errorColor.color, ...hoverDeny }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: successColor.color,
            width: "105px",
            ...hoverAccept,
          }}
        >
          Ok
        </Button>
      </div>
    </div>
  );
};

export default DenyProofForm;
