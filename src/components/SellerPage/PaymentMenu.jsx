import React, { useState } from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
} from "@mui/material";

export default function PaymentMenu({ onPaymentSelect }) {
  const [payment, setPayment] = useState("");

  const handleChange = (event) => {
    setPayment(event.target.value);
    onPaymentSelect();
  };

  return (
    <Box sx={{ minWidth: 120, width: "40%" }}>
      <Typography>Please choose a method of payment:</Typography>
      <FormControl fullWidth>
        <InputLabel id="payment-menu-label">Payment</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="payment-select"
          value={payment}
          label="Payment"
          onChange={handleChange}
        >
          <MenuItem value="Cash">Cash / Check</MenuItem>
          <MenuItem value="Check">PayPal</MenuItem>
          <MenuItem value="Donation">Credit / Debit Card</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
