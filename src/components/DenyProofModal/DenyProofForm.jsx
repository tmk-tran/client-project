import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { errorColor } from "../Utils/colors";

const DenyProofForm = () => {
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
          <Button variant="contained" sx={{ backgroundColor: errorColor.color }}>
            Cancel
          </Button>
          <Button variant="contained">
            Ok
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DenyProofForm;
