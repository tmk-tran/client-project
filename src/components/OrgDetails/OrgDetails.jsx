import React from "react";
import { Typography } from "@mui/material";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function NewOrgForm() {
  return (
    <div className="container">
      <center>
        <Typography variant="h4">Organization Details</Typography>
      </center>
    </div>
  );
}

export default NewOrgForm;
