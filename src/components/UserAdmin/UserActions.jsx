import { errorColor, primaryColor } from "../Utils/colors";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ActionButton from "../OrgSellers/ActionButton";

const editIconStyle = {
  color: primaryColor.color,
  "&:hover": {
    color: "#325CAB",
    transition: "transform 0.2s",
    cursor: "pointer",
  },
};

const deleteIconStyle = {
  color: errorColor.color,
  "&:hover": {
    color: errorColor.color,
    cursor: "pointer",
  },
  fontSize: 24,
};

export default function UserActions({ user, startEdit, handleDelete }) {
  return (
    <>
      <ActionButton
        title="Edit Username"
        Icon={EditNoteIcon}
        buttonSx={{ mr: 3 }}
        iconSx={editIconStyle}
        onClick={() => startEdit(user.id)}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />

      <ActionButton
        title="Delete user"
        Icon={DeleteForeverIcon}
        iconSx={deleteIconStyle}
        onClick={() => handleDelete(user.id)}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
    </>
  );
}
