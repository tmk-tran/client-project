import { errorColor, primaryColor } from "../Utils/colors";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ArchiveIcon from "@mui/icons-material/Archive";
import ActionButton from "./ActionButton";

const editIconStyle = {
  color: primaryColor.color,
  "&:hover": {
    color: "#325CAB",
    transition: "transform 0.2s",
    cursor: "pointer",
  },
};

const archiveIconStyle = {
  color: primaryColor.color,
  "&:hover": {
    color: errorColor.color,
    cursor: "pointer",
  },
};

export default function ActionIcons({ seller, onEdit, handleArchive }) {
  return (
    <>
      <ActionButton
        title="Edit info"
        Icon={EditNoteIcon}
        buttonSx={{ mr: 3 }}
        iconSx={editIconStyle}
        onClick={() => onEdit(seller.id)}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />

      <ActionButton
        title="Archive"
        Icon={ArchiveIcon}
        iconSx={archiveIconStyle}
        onClick={() => handleArchive(seller.id)}
      />
    </>
  );
}
