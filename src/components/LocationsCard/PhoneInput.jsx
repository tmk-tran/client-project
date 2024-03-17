import React from "react";
import TextField from "@mui/material/TextField";

const PhoneInput = ({ phoneNumber, setPhoneNumber, sx }) => {
  const formattedPhoneNumber = `(${phoneNumber.slice(
    0,
    3
  )}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;

  const handlePhoneNumberChange = (event) => {
    const input = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    if (input.length <= 10) {
      setPhoneNumber(input); // Update parent state with the unformatted number
    }
  };

  return (
    <TextField
      label="Phone Number"
      variant="outlined"
      value={formattedPhoneNumber}
      onChange={handlePhoneNumberChange}
      fullWidth
      sx={sx}
    />
  );
};

export default PhoneInput;
