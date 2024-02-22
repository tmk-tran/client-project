import { errorColor, primaryColor } from "../Utils/colors";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ArchiveIcon from "@mui/icons-material/Archive";

const editIconStyle = {
  color: primaryColor.color,
  "&:hover": {
    color: "#325CAB",
    transition: "transform 0.2s",
    cursor: "pointer",
  },
};

const archiveIconStyle = {
  ml: 1,
  color: primaryColor.color,
  "&:hover": {
    color: errorColor.color,
    cursor: "pointer",
  },
};

export default function ActionIcons({ seller, onEdit, handleArchive }) {
  return (
    <>
      <EditNoteIcon
        sx={editIconStyle}
        onClick={() => onEdit(seller.id)}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
      <ArchiveIcon
        sx={archiveIconStyle}
        onClick={() => handleArchive(seller.id)}
      />
    </>
  );
}
