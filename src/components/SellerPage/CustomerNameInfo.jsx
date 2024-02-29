import { TextField } from "@mui/material";

export default function CustomerNameInfo() {
  return (
    <>
      <TextField label="Last Name" />
      <TextField label="First Name" />
      <TextField label="Phone Number" type="number" />
    </>
  );
}
