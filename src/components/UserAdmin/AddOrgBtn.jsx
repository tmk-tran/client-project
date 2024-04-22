import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function AddOrgBtn({ title, sx, onClick }) {
  return (
    <>
      <IconButton title={title} onClick={onClick}>
        <AddCircleIcon sx={sx} />
      </IconButton>
    </>
  );
}
