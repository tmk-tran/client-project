import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function CloseButton({ handleClose }) {
  return (
    <Button
      onClick={handleClose}
    //   variant="outlined"
      style={{ position: "absolute" }}
    >
      <CloseIcon />
    </Button>
  );
}
