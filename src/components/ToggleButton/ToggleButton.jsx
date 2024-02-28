import { Button } from "@mui/material";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

export default function ToggleButton({
  onClick,
  toggleState,
  label1,
  label2,
  sxButton,
  sxIcon,
}) {
  return (
    <Button
      // variant="outlined"
      onClick={onClick}
      sx={sxButton}
    >
      {!toggleState ? (
        <>
          <ToggleOnIcon sx={sxIcon} />
          {label1}
        </>
      ) : (
        <>
          <ToggleOffIcon sx={sxIcon} />
          {label2}
        </>
      )}
    </Button>
  );
}
