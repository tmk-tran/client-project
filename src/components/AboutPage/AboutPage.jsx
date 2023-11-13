import React from "react";

// Styling
import { Typography } from "@mui/material";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <br />
      <div>
        <center>
          <Typography variant="h4">
            This project is currently under construction
          </Typography>
        </center>
      </div>
    </div>
  );
}

export default AboutPage;
