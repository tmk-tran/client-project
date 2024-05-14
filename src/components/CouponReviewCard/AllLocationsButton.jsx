import React, { useEffect, useState } from "react";
import { Radio, FormControlLabel, FormGroup } from "@mui/material";

function ValidAtAllLocationsRadio({ onSelect, acceptedAt }) {
  const [selectedValue, setSelectedValue] = useState("");
  console.log(selectedValue);
  console.log(acceptedAt);

  useEffect(() => {
    if (acceptedAt && acceptedAt.length > 1) {
      setSelectedValue("validAtAllLocations");
    }
  }, [acceptedAt]);

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
