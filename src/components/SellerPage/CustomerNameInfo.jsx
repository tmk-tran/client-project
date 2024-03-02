import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { border } from "../Utils/colors";
import { flexCenter } from "../Utils/pageStyles";

// export default function CustomerNameInfo() {
//   const [customerLastName, setCustomerLastName] = useState("");
//   const [customerFirstName, setCustomerFirstName] = useState("");
//   const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");

//   const handleLastName = (e) => setCustomerLastName(e.target.value);

//   const handleFirstName = (e) => setCustomerFirstName(e.target.value);

//   const handlePhoneNumber = (e) => setCustomerPhoneNumber(e.target.value);

//   return (
//     <Box sx={{ display: "flex", gap: 2 }}>
//       <TextField value={customerLastName} fullWidth label="Last Name" onChange={handleLastName} />
//       <TextField value={customerFirstName} fullWidth label="First Name" onChange={handleFirstName} />
//       <TextField
//         value={customerPhoneNumber}
//         fullWidth
//         label="Phone Number"
//         type="number"
//         onChange={handlePhoneNumber}
//       />
//     </Box>
//   );
// }

export default function CustomerNameInfo() {
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
      customerLastName,
      customerFirstName,
      customerPhoneNumber
    );
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
