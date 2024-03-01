import { Box, TextField } from "@mui/material";
import { border } from "../Utils/colors";
import { flexCenter } from "../Utils/pageStyles";

export default function CustomerNameInfo() {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <TextField fullWidth label="Last Name" />
      <TextField fullWidth label="First Name" />
      <TextField fullWidth label="Phone Number" type="number" />
    </Box>
  );
}
