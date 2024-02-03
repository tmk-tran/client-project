import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import {
  Button,
  Typography,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import "./NotesDisplay.css";
// ~~~~~~~~~~ Icons ~~~~~~~~~~
import DeleteIcon from "@mui/icons-material/Delete";
// ~~~~~~~~~~ Utils ~~~~~~~~~~
import { formatDate, hrStyle } from "../Utils/helpers";
import { showSaveSweetAlert, showDeleteSweetAlert } from "../Utils/sweetAlerts";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";

// ~~~~~~~~~~ Toasts (INACTIVE, MAY USE LATER) ~~~~~~~~~~
import { showToast } from "../Utils/toasts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NotesDisplay({
  notes,
  orgDetails, // change name ??
  caseType,
  isMerchantTaskPage,
}) {
  console.log(isMerchantTaskPage);
  console.log(notes);
  console.log(orgDetails);
  console.log(caseType);
  console.log(notes);

  const dispatch = dispatchHook();
  const paramsObject = useParams();

  // State for showing notes
  const [noteDelete, setNoteDelete] = useState(false);
  const [inputValue, setInputValue] = useState("");
  // State from popover
  // const [orgId, setOrgId] = useState(orgDetails.organization_id);
  const [orgId, setOrgId] = useState(
    !isMerchantTaskPage ? orgDetails.organization_id : orgDetails.id
  );
  console.log(orgId);
  const [noteDate, setNoteDate] = useState(new Date());
  const [noteAdded, setNoteAdded] = useState(false);

  // Access merchant_id directly from orgDetails if isMerchantTaskPage is true
  const merchantId = isMerchantTaskPage ? orgDetails.id : null;
  console.log(merchantId);

  // useEffect(() => {
  //   // Fetch org notes whenever noteAdded changes
  //   dispatch({
  //     type: "FETCH_ORG_NOTES",
  //     payload: paramsObject.id,
  //   });

  //   // Reset noteAdded after fetching data
  //   setNoteAdded(false);
  // }, [dispatch, paramsObject.id, noteAdded]);

  useEffect(() => {
    // Define the action type based on isMerchantTaskPage
    const fetchNotesActionType = !isMerchantTaskPage
      ? "FETCH_ORG_NOTES"
      : "FETCH_MERCHANT_NOTES";

    // Fetch notes based on the determined action type
    dispatch({
      type: fetchNotesActionType,
      payload: paramsObject.id,
    });

    // Reset noteAdded after fetching data
    setNoteAdded(false);
  }, [dispatch, paramsObject.id, noteAdded, isMerchantTaskPage]);

  const handleSave = () => {
    // Format the date as "mm/dd/yyyy"
    const formattedDate = noteDate.toLocaleDateString("en-US");

    // const sendNote = {
    //   organization_id: orgId,
    //   note_date: formattedDate,
    //   note_content: inputValue,
    // };

    const sendNote = {
      organization_id: !isMerchantTaskPage ? orgId : null,
      merchant_id: isMerchantTaskPage ? orgId : null,
      note_date: formattedDate,
      note_content: inputValue,
    };

    // const saveCall = () => {
    //   dispatch({ type: "ADD_ORG_NOTES", payload: sendNote });
    //   setNoteAdded(true);
    // };

    const saveCall = () => {
      const actionType = isMerchantTaskPage
        ? "ADD_MERCHANT_NOTES"
        : "ADD_ORG_NOTES";
      dispatch({ type: actionType, payload: sendNote });
      console.log(sendNote);
      setNoteAdded(true);
    };

    // Sweet Alert
    showSaveSweetAlert(saveCall);

    setInputValue("");
  };

  // const handleDelete = (id, organization_id) => {
  //   console.log(id);
  //   // const deleteCall = () => {
  //   const actionType = isMerchantTaskPage
  //     ? "DELETE_MERCHANT_NOTE"
  //     : "DELETE_ORG_NOTE";

  //   const accountId = isMerchantTaskPage ? { id } : { organization_id };

  //   dispatch({ type: actionType, payload: accountId });
  //   setNoteDelete(true);
  //   // };
  //   // from Utils
  //   // showDeleteSweetAlert(deleteCall);
  //   console.log(actionType);
  //   console.log(accountId);
  //   console.log(organization_id);
  //   console.log(id);

  const handleDelete = (noteId, entityId) => {
    console.log(noteId);
    console.log(entityId);
    // Assuming you're using Redux for state management
    const actionType = isMerchantTaskPage
      ? "DELETE_MERCHANT_NOTE"
      : "DELETE_ORG_NOTE";

    dispatch({
      type: actionType,
      payload: {
        noteId,
        entityId,
      },
    });
  };

  return (
    <div className="notes-card-container">
      <Card
        elevation={3}
        className={`notes-card ${caseType === 1 ? "notes-card-task-view" : ""}`}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{ textAlign: "center", mb: 1, fontWeight: "bold" }}
          >
            Notes
          </Typography>

          <div
            className={`orgNotes-container ${
              caseType === 1
                ? "orgNotes-container-task-view"
                : caseType === 2
                ? "additional-style-2"
                : ""
            }`}
          >
            {notes && notes.length > 0 ? (
              <div style={{ height: "40vh" }}>
                {notes
                  .filter((note) => !note.is_deleted) // Filter out deleted notes
                  .map((note, i) => (
                    <div className="note-main-container" key={i}>
                      <Typography sx={{ mt: 1 }} variant="caption">
                        {formatDate(note.note_date)}
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* <li style={{ marginLeft: "10%" }}>
                          {note.note_content.charAt(0).toUpperCase() +
                            note.note_content.slice(1).toLowerCase()}
                        </li> */}
                        <li style={{ marginLeft: "10%" }}>
                          {note.note_content &&
                            note.note_content
                              .split(" ")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                        </li>

                        {/* <Button
                          className="notes-delete-btn"
                          onClick={() =>
                            isMerchantTaskPage
                              ? handleDelete(note.id, note.merchant_id)
                              : handleDelete(note.id, note.organization_id)
                          }
                        > */}
                        <Button
                          className="notes-delete-btn"
                          onClick={() => {
                            if (isMerchantTaskPage) {
                              console.log(
                                "Merchant Task Page - Note ID:",
                                note.id,
                                "Merchant ID:",
                                note.merchant_id
                              );
                              handleDelete(note.id, note.merchant_id);
                            } else {
                              console.log(
                                "Organization Task Page - Note ID:",
                                note.id,
                                "Organization ID:",
                                note.organization_id
                              );
                              handleDelete(note.id, note.organization_id);
                            }
                          }}
                        >
                          <DeleteIcon style={{ fontSize: "20px" }} />
                        </Button>
                      </div>
                      <br />
                      <hr style={hrStyle} />
                    </div>
                  ))}
              </div>
            ) : (
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  backgroundColor: "rgb(243, 243, 243)",
                }}
              >
                None Available
              </Typography>
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
              sx={{ mt: 1 }}
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
