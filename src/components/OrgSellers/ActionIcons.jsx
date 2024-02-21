import { errorColor, primaryColor } from "../Utils/colors";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ArchiveIcon from "@mui/icons-material/Archive";

export default function ActionIcons({ seller, onEdit, handleArchive }) {
  return (
    <>
      <EditNoteIcon
        sx={{
          "&:hover": {
            color: "#325CAB",
            transition: "transform 0.2s",
          },
          color: primaryColor.color,
        }}
        onClick={() => onEdit(seller.id)}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
      <ArchiveIcon
        sx={{
          marginLeft: 1,
          "&:hover": { color: errorColor.color },
          color: primaryColor.color,
        }}
        onClick={() => handleArchive(seller.id)}
      />
    </>
  );
}
