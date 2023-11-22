import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Typography, Card, CardContent } from "@mui/material";
// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
// Utils
import { formatDate } from "../Utils/helpers";

export default function OrgNotesDisplay({ notes }) {
  const dispatch = useDispatch();
  console.log(notes);

  // State for showing notes
  const [noteDelete, setNoteDelete] = useState(false);

  const handleDelete = (id, organization_id) => {
    dispatch({ type: "DELETE_ORG_NOTE", payload: { id, organization_id } });
    setNoteDelete(true);
  };

  return (
    <div className="notes-card-container">
      <Card elevation={4} className="notes-card">
        <CardContent>
          <Typography variant="h6" sx={{ textAlign: "center", mb: 1 }}>
            <DescriptionIcon />
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
                      <li>{note.note_content}</li>
                      <Button
                        className="notes-delete-btn"
                        onClick={() =>
                          handleDelete(note.id, note.organization_id)
                        }
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                    <br />
                    <hr style={{ width: "80%", border: "1px solid #273b91" }} />
                  </div>
                ))}
              </div>
            ) : (
              <Typography variant="h6">No Notes Available</Typography>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
