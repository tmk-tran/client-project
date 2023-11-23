import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// Style
import {
  Box,
  Button,
  TextField,
  Typography,
  Popover,
  useTheme,
  useMediaQuery,
} from "@mui/material/";
// Icons
import "./OrgNotesModal.css";
// Utils
import { modalBtnStyle } from "../Utils/helpers";
import { showSaveSweetAlert } from "../Utils/sweetAlerts";
import { showToast } from "../Utils/toasts";

export default function NotesPopover({ info, onNoteAdded }) {
  const dispatch = useDispatch();
  const paramsObject = useParams();
  // state for the popover
  const [anchorEl, setAnchorEl] = useState(null);
  // state for the add group form
  const [orgId, setOrgId] = useState(info.organization_id);
  const [newNote, setNewNote] = useState("");
  const [noteDate, setNoteDate] = useState(new Date());
  const [noteAdded, setNoteAdded] = useState(false);

  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    // Fetch org notes whenever noteAdded changes
    dispatch({
      type: "FETCH_ORG_NOTES",
      payload: paramsObject.id,
    });

    // Reset noteAdded after fetching data
    setNoteAdded(false);
  }, [dispatch, paramsObject.id, noteAdded]);

  // Trigger onNoteAdded when a new note is added
  useEffect(() => {
    if (noteAdded) {
      onNoteAdded();
    }
  }, []);

  const handleSave = () => {
    // Format the date as "mm/dd/yyyy"
    const formattedDate = noteDate.toLocaleDateString("en-US");

    const sendNote = {
      organization_id: orgId,
      note_date: formattedDate,
      note_content: newNote,
    };

    const saveCall = () => {
      dispatch({ type: "ADD_ORG_NOTES", payload: sendNote });
      setNoteAdded(true);
    };

    // from Utils
    // showToast();

    // Sweet Alert
    showSaveSweetAlert(saveCall);

    setNewNote("");
    handleClose();
    onNoteAdded();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="popover-notes-container">
      <Button id="add-note-button" variant="contained" onClick={handleClick}>
        Add Note
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        // onClose={handleClose}
        onClose={() => {}}
        anchorOrigin={{
          vertical: isMobile ? "top" : "top",
          horizontal: isMobile ? "center" : "center",
        }}
        transformOrigin={{
          vertical: isMobile ? "bottom" : "bottom",
          horizontal: isMobile ? "center" : "center",
        }}
      >
        <Box style={{ padding: "20px" }}>
          <div>
            <div className="add-notes">
              <TextField
                fullWidth
                label="New Note"
                multiline
                rows={4}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              ></TextField>
            </div>
            <div style={modalBtnStyle}>
              <Button className="modal-cancel-btn" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </Box>
      </Popover>
    </div>
  );
}
