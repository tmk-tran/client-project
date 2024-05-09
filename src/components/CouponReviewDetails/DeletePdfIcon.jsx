import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton, Tooltip } from "@mui/material";
import { errorColor } from "../Utils/colors";

const deletePdfSx = {
  color: errorColor.color,
};
export default function DeletePdfIcon({ size, deleteTitle, onDelete }) {

  const handleDelete = () => {
    onDelete();
  };

  return (
    <Tooltip title={deleteTitle}>
      <IconButton sx={{ fontSize: size }} onClick={handleDelete} >
        <DeleteForeverIcon sx={{ ...deletePdfSx, fontSize: size }} />
      </IconButton>
    </Tooltip>
  );
}
