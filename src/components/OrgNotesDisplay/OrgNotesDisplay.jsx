import React, { useState } from "react";
import { useDispatch } from "react-redux";
// Style
import { Button, Typography, Card, CardContent } from "@mui/material";
import "./OrgNotesDisplay.css";
// Icons
import DeleteIcon from "@mui/icons-material/Delete";
// Utils
import { formatDate } from "../Utils/helpers";
import { showDeleteSweetAlert } from "../Utils/sweetAlerts";
// Toasts
import { showToast } from "../Utils/toasts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrgNotesDisplay({ notes }) {
  const dispatch = useDispatch();

  // State for showing notes
  const [noteDelete, setNoteDelete] = useState(false);

  const handleDelete = (id, organization_id) => {
    dispatch({ type: "DELETE_ORG_NOTE", payload: { id, organization_id } });
    setNoteDelete(true);
    // from Utils
    showDeleteSweetAlert();
  };

  return (
    <div className="notes-card-container">
      <Card elevation={4} className="notes-card">
        <CardContent>
          <Typography variant="h6" sx={{ textAlign: "center", mb: 1 }}>
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
                        <li>
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
        </CardContent>
      </Card>
      {/* Toast */}
      {/* <ToastContainer
                  style={{
                    top: "45%",
                    right: "68%",
                    transform: "translate(-50%, -50%)",
                  }}
                /> */}
    </div>
  );
}
