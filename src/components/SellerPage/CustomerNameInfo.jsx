import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { border } from "../Utils/colors";
import { flexCenter } from "../Utils/pageStyles";
import { dispatchHook } from "../../hooks/useDispatch";

export default function CustomerNameInfo() {
  const seller = useParams();
  const dispatch = dispatchHook();
  const refId = seller.refId;
  console.log(refId);
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handleLastName = (e) => setCustomerLastName(e.target.value);
  const handleFirstName = (e) => setCustomerFirstName(e.target.value);
  const handlePhoneNumber = (e) => {
    const value = e.target.value;
    if (!/^\d{0,10}$/.test(value)) {
      setPhoneNumberError("Phone number must be 10 digits long");
    } else {
      setPhoneNumberError("");
      setCustomerPhoneNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerPhoneNumber || customerPhoneNumber.length !== 10) {
      setPhoneNumberError("Phone number must be 10 digits long");
      return;
    }
    // Call your submit function here
    console.log(
      "Submitting form with info:",
      refId,
      customerLastName,
      customerFirstName,
      customerPhoneNumber
    );
    const dispatchAction = {
      type: "ADD_CUSTOMER",
      payload: {
        refId: refId,
        last_name: customerLastName,
        first_name: customerFirstName,
        phone: customerPhoneNumber,
      },
    };
    console.log("Dispatching action:", dispatchAction);
    dispatch(dispatchAction);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          value={customerLastName}
          fullWidth
          label="Last Name"
          onChange={handleLastName}
        />
        <TextField
          value={customerFirstName}
          fullWidth
          label="First Name"
          onChange={handleFirstName}
        />
        <TextField
          value={customerPhoneNumber}
          fullWidth
          label="Phone Number"
          type="number"
          error={!!phoneNumberError}
          helperText={phoneNumberError}
          onChange={handlePhoneNumber}
        />
      </Box>
      <Button type="submit">Submit</Button>
    </form>
  );
}
