import React, { useState } from "react";
import { useDispatch } from "react-redux";
// Style
import {
  Button,
  Typography,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import "./OrgNotesDisplay.css";
// Icons
import DeleteIcon from "@mui/icons-material/Delete";
// Utils
import { formatDate, modalBtnStyle } from "../Utils/helpers";
import { showDeleteSweetAlert } from "../Utils/sweetAlerts";
// Components
import OrgNotesModal from "../OrgNotesModal/OrgNotesModal";
// Toasts
import { showToast } from "../Utils/toasts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrgNotesDisplay({ notes, orgDetails }) {
  const dispatch = useDispatch();

  // State for showing notes
  const [noteDelete, setNoteDelete] = useState(false);

  const handleDelete = (id, organization_id) => {
    const deleteCall = () => {
      dispatch({ type: "DELETE_ORG_NOTE", payload: { id, organization_id } });
      setNoteDelete(true);
    };
    // from Utils
    showDeleteSweetAlert(deleteCall);
  };

  return (
    <div className="notes-card-container">
      <Card elevation={4} className="notes-card">
        <CardContent>
          <Typography
            variant="h6"
            sx={{ textAlign: "center", mb: 1, fontWeight: "bold" }}
          >
            Notes
          </Typography>
          <div className="orgNotes-container">
            {notes && notes.length > 0 ? (
              <div>
                {notes
                  .filter((note) => !note.is_deleted) // Filter out deleted notes
                  .map((note, i) => (
                    <div key={i}>
                      <Typography sx={{ mt: 1 }} variant="caption">
                        {formatDate(note.note_date)}
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <li style={{ marginLeft: "10%" }}>
                          {note.note_content.charAt(0).toUpperCase() +
                            note.note_content.slice(1).toLowerCase()}
                        </li>
                        <Button
                          className="notes-delete-btn"
                          onClick={() =>
                            handleDelete(note.id, note.organization_id)
                          }
                        >
                          <DeleteIcon style={{ fontSize: "20px" }} />
                        </Button>
                      </div>
                      <br />
                      <hr
                        style={{ width: "80%", border: "1px solid #273b91" }}
                      />
                    </div>
                  ))}
              </div>
            ) : (
              <Typography variant="h6">No Notes Available</Typography>
            )}
          </div>
          {/* <div>
            <div className="add-notes">
              <TextField
                fullWidth
                label="Note"
                multiline
                rows={3}
                // value={newNote}
                // onChange={(e) => setNewNote(e.target.value)}
              ></TextField>
            </div>
            <div style={modalBtnStyle}>
              <Button className="modal-cancel-btn">Cancel</Button>
              <Button>Save</Button>
            </div>
          </div> */}
          {/* <Button fullWidth>Add Note</Button> */}
        </CardContent>
        {/* <OrgNotesModal info={orgDetails}/> */}
      </Card>
    </div>
  );
}
