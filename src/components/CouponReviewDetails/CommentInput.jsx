import React from "react";
import { TextField, Button, IconButton, Paper } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export default function CommentInput() {
  const handleSubmit = () => {
    // Handle comment submission logic
  };

  const handleFileUpload = () => {
    // Handle file upload logic
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        height: "fit-content",
      }}
    >
      <TextField
        label="Type your comment..."
        multiline
        maxRows={4}
        variant="outlined"
        style={{ marginBottom: "10px" }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton color="primary" onClick={handleFileUpload}>
          <AttachFileIcon />
        </IconButton>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Paper>
  );
}
