import React, { useState } from "react";
import { Radio, FormControlLabel, FormGroup } from "@mui/material";

function ValidAtAllLocationsRadio() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormGroup>
      <FormControlLabel
        value="validAtAllLocations"
        control={<Radio />}
        label="Valid at all locations"
        checked={selectedValue === "validAtAllLocations"}
        onChange={handleChange}
      />
    </FormGroup>
  );
}

export default ValidAtAllLocationsRadio;
