import { Box } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CustomButton from "../CustomButton/CustomButton";

export default function OrgAdminButtons() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CustomButton
        label="Request Paper Books"
        variant="contained"
        Icon={<LibraryBooksIcon sx={{ fontSize: "larger", ml: 1 }} />}
      />
    </Box>
  );
}
