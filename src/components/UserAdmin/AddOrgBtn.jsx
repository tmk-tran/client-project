import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function AddOrgBtn({ title, sx, disabled, onClick }) {
  return (
    <>
      <IconButton title={title} disabled={disabled} onClick={onClick}>
        <AddCircleIcon sx={sx} />
      </IconButton>
    </>
  );
}
