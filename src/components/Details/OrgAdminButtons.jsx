import { Box } from "@mui/material";
import RequestBooks from "./RequestBooks";

export default function OrgAdminButtons() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <RequestBooks />
    </Box>
  );
}
