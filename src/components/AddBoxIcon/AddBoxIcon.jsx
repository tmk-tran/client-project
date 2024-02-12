import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { buttonIconSpacing } from "../Utils/helpers";

export default function AddBox({ label, buttonStyle, onClick }) {
 
  return (
    <Button sx={{ ...buttonStyle }} onClick={onClick}>
      <AddBoxIcon sx={buttonIconSpacing} />
      {label}
    </Button>
  );
}
