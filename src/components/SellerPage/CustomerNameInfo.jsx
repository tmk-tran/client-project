import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { border } from "../Utils/colors";
import { flexCenter } from "../Utils/pageStyles";

export default function CustomerNameInfo() {
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");

  const handleLastName = (e) => setCustomerLastName(e.target.value);

  const handleFirstName = (e) => setCustomerFirstName(e.target.value);

  const handlePhoneNumber = (e) => setCustomerPhoneNumber(e.target.value);

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <TextField value={customerLastName} fullWidth label="Last Name" onChange={handleLastName} />
      <TextField value={customerFirstName} fullWidth label="First Name" onChange={handleFirstName} />
      <TextField
        value={customerPhoneNumber}
        fullWidth
        label="Phone Number"
        type="number"
        onChange={handlePhoneNumber}
      />
    </Box>
  );
}
