import React, { useState } from "react";
import { TextField } from "@mui/material";

const StateInput = ({ label, stateInput }) => {
  const [state, setState] = useState("");
  const [stateError, setStateError] = useState("");

  const handleStateChange = (event) => {
    const value = event.target.value;

    if (value.length > 2) {
      setStateError("Please enter only two letters for the state");
      return;
    }

    setState(value.toUpperCase());
    setStateError("");
    stateInput(value.toUpperCase());
  };

  return (
    <TextField
      label={label}
      value={state}
      onChange={handleStateChange}
      fullWidth
      error={!!stateError}
      helperText={stateError}
    />
  );
};

export default StateInput;
