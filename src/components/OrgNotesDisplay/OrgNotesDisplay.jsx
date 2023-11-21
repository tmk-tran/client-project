import React from "react";
import { Button, Typography, Card, CardContent } from "@mui/material";
// Icons
import DeleteIcon from "@mui/icons-material/Delete";
// Utils
import { formatDate } from "../Utils/helpers";

export default function OrgNotesDisplay({ notes }) {
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
                {notes.map((note, i) => (
                  <div key={i}>
                    <Typography sx={{ mt: 1 }} variant="body2">
                      {formatDate(note.note_date)}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <li>{note.note_content}</li>
                      <Button className="notes-delete-btn">
                        <DeleteIcon />
                      </Button>
                    </div>
                    <br />
                    <hr style={{ width: "80%" }} />
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
