import React, { useState } from "react";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

const RadioButtons = ({ choices, onSelectionChange }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    // Pass the selected option to the parent component
    onSelectionChange(value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <RadioGroup
      aria-label="contact-method"
      name="contact-method"
      value={selectedOption}
      onChange={handleOptionChange}
      row
    >
      {choices.map((choice) => (
        <FormControlLabel
          key={choice}
          value={choice}
          control={<Radio size="small" />}
          label={choice}
        />
      ))}
    </RadioGroup>
    </div>
  );
};

export default RadioButtons;
