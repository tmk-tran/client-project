import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
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
import { showSaveSweetAlert } from "../Utils/sweetAlerts";
import { showDeleteSweetAlert } from "../Utils/sweetAlerts";
// Toasts
import { showToast } from "../Utils/toasts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrgNotesDisplay({ notes, orgDetails }) {
  const dispatch = useDispatch();
  const paramsObject = useParams();

  // State for showing notes
  const [noteDelete, setNoteDelete] = useState(false);
  const [inputValue, setInputValue] = useState("");
  // State from popover
  const [orgId, setOrgId] = useState(orgDetails.organization_id);
  const [noteDate, setNoteDate] = useState(new Date());
  const [noteAdded, setNoteAdded] = useState(false);

  useEffect(() => {
    // Fetch org notes whenever noteAdded changes
    dispatch({
      type: "FETCH_ORG_NOTES",
      payload: paramsObject.id,
    });

    // Reset noteAdded after fetching data
    setNoteAdded(false);
  }, [dispatch, paramsObject.id, noteAdded]);

  const handleSave = () => {
    // Format the date as "mm/dd/yyyy"
    const formattedDate = noteDate.toLocaleDateString("en-US");

    const sendNote = {
      organization_id: orgId,
      note_date: formattedDate,
      note_content: inputValue,
    };

    const saveCall = () => {
      dispatch({ type: "ADD_ORG_NOTES", payload: sendNote });
      setNoteAdded(true);
    };

    // Sweet Alert
    showSaveSweetAlert(saveCall);

    setInputValue("");
  };

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
      <Card elevation={3} className="notes-card">
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
                        {/* <Button
                          className="notes-delete-btn"
                          onClick={() =>
                            handleDelete(note.id, note.organization_id)
                          }
                        >
                          <DeleteIcon style={{ fontSize: "20px" }} />
                        </Button> */}
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
                        style={{ width: "85%", border: "1px solid #273b91" }}
                      />
                    </div>
                  ))}
              </div>
            ) : (
              <Typography variant="h6">None Available</Typography>
            )}
          </div>
          <div>
            <TextField
              label="Add a note..."
              value={inputValue}
              variant="standard"
              onChange={(e) => setInputValue(e.target.value)}
              multiline
              fullWidth
            />
            {inputValue && (
              <Button
                // variant="contained"
                color="primary"
                onClick={handleSave}
                // style={{ flexGrow: 1 }}
                style={{ marginTop: "10px" }}
                fullWidth
              >
                Add
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
