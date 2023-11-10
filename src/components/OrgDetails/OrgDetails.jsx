import React from "react";
import { TextField, Typography, Card, CardContent } from "@mui/material";

function orgDetails() {
  return (
    <div className="container">
      <center>
        <Typography variant="h4">Organization Details</Typography>
      </center>
      <Card>
        <CardContent>
          <TextField></TextField>
        </CardContent>
      </Card>
    </div>
  );
}

export default orgDetails;
