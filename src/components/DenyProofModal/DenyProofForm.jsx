import React from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { errorColor, successColor } from "../Utils/colors";
// ~~~~~~~~~~ Helpers ~~~~~~~~~~
import { hoverDeny, hoverAccept } from "../Utils/helpers";

const DenyProofForm = ({ onClose }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" align="center">
          Please Enter Reason
        </Typography>

        <TextField
          multiline
          rows={4}
          fullWidth
          label="Comments or coupon changes here..."
          variant="outlined"
          style={{ marginTop: 16 }}
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
      </CardContent>
    </Card>
  );
};

export default DenyProofForm;
