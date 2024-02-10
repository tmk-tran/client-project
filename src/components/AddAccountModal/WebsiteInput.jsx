import React, { useState } from "react";
import { TextField } from "@mui/material";

const WebsiteInput = ({ label, onWebsiteChange }) => {
  const [website, setWebsite] = useState("");
  const [websiteError, setWebsiteError] = useState("");

  const handleWebsiteChange = (event) => {
    const value = event.target.value;
    setWebsite(value);

    // Validate website format
    const websiteRegex =
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
    if (!websiteRegex.test(value)) {
      setWebsiteError(
        "Please enter a valid website format (e.g., www.example.com)"
      );
    } else {
      setWebsiteError("");
      // Pass the website value to the parent component
      onWebsiteChange(value);
    }
  };

  return (
    <TextField
      label={label}
      value={website}
      onChange={handleWebsiteChange}
      fullWidth
      error={!!websiteError}
      helperText={websiteError}
    />
  );
};

export default WebsiteInput;
