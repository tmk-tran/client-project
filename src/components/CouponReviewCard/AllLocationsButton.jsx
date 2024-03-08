import React, { useState } from "react";
import { Radio, FormControlLabel, FormGroup } from "@mui/material";

function ValidAtAllLocationsRadio({ onSelect }) {
  const [selectedValue, setSelectedValue] = useState("");
  console.log(selectedValue);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onSelect(true);
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
