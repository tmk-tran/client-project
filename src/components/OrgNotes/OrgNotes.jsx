import React, { useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import "./OrgNotes.css";
// Utils
import { modalBtnStyle, showToast } from "../Utils/helpers";

export default function BasicPopover({ info }) {
  //   const dispatch = useDispatch();
  // state for the popover
  const [anchorEl, setAnchorEl] = useState(null);
  // state for the add group form
  const [orgId, setOrgId] = useState(info.organization_id);
  const [newNote, setNewNote] = useState("");
  const [noteDate, setNoteDate] = useState(new Date());

  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSave = () => {
    // Trim the time part of the noteDate
    const trimmedDate = new Date(noteDate);
    trimmedDate.setUTCHours(0, 0, 0, 0);
    // Format the date as "mm/dd/yyyy"
    const formattedDate = trimmedDate.toLocaleDateString("en-US");

    const sendNote = {
      organization_id: orgId,
      note_date: formattedDate,
      note_content: newNote,
    };

    // from Utils
    // showToast();

    dispatch({ type: "ADD_NOTE", payload: sendNote });

    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="popover-container">
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Notes
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        // onClose={handleClose}
        onClose={() => {}}
        anchorOrigin={{
          vertical: isMobile ? "top" : "bottom",
          horizontal: isMobile ? "center" : "right",
        }}
        transformOrigin={{
          vertical: isMobile ? "bottom" : "bottom",
          horizontal: isMobile ? "center" : "left",
        }}
      >
        <Box style={{ padding: "20px" }}>
          <div>
            <Typography sx={{ p: 1, textAlign: "center", fontWeight: "bold" }}>
              Notes
            </Typography>
          </div>
          <div>
            <div className="add-notes">
              <TextField
                fullWidth
                label="Notes"
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