import EditNoteIcon from "@mui/icons-material/EditNote";
import { Button } from "@mui/material";

export default function EditButton({ onClick, title }) {
  return (
    <Button title={title} onClick={onClick}>
      <EditNoteIcon />
    </Button>
  );
}
