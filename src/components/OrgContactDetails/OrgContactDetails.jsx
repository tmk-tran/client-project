import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Icons
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EditNoteIcon from "@mui/icons-material/EditNote";
// Helpers
import {
  centeredStyle,
  formatPhoneNumber,
  listItemStyle,
  styleIconColor,
  capitalizeWords,
} from "../Utils/helpers";
// Styles
import {
  Box,
  Button,
  Card,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Typography,
  TextField,
  useMediaQuery,
} from "@mui/material";
import "./OrgContactDetails.css";
// Component
import OrgContactEdit from "../OrgContactEdit/OrgContactEdit";
// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrgContactDetails({ info }) {
  const dispatch = useDispatch();
  const contactPhone = formatPhoneNumber(info.primary_contact_phone);
  const isSmallScreen = useMediaQuery("(max-width:400px)");
  const [edit, setEdit] = useState(false);
  console.log(edit);

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = (editedItem) => {
    // Dispatch action to update the state or save data
    console.log("New Contact Info:", editedItem);
    dispatch({ type: "EDIT_CONTACT_INFO", payload: editedItem });
    setIsEditing(false);
  };

  return (
    <>
      <div className="org-details">
        <div className="org-address-container">
          <div>
            <center>
              <div className="org-details-header">
                <div className="edit-icon-btn">
                  <Button onClick={() => setEdit(!edit)}>
                    <EditNoteIcon />
                  </Button>
                </div>
                {/* <Button><EditNoteIcon /></Button> */}
                <div>
                  <Typography variant="h6">{info.organization_name}</Typography>
                  <Typography>{info.type}</Typography>
                </div>
              </div>
            </center>
          </div>
          <div className="org-address">
            <center>
              <Typography>{info.address}</Typography>
              <Typography>
                {info.city}, {info.state} {info.zip}
              </Typography>
            </center>
          </div>
        </div>

        <Card
          elevation={5}
          sx={{
            maxWidth: 360,
            bgcolor: "background.paper",
            ...(isSmallScreen && {
              maxWidth: "100%", // Adjust styles for smaller screens
            }),
          }}
        >
          <ToastContainer
            style={{
              top: "45%",
              left: "68%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <List style={{ width: "70%", marginTop: "10px" }}>
            <ListItem disablePadding style={listItemStyle}>
              <ListItemIcon style={centeredStyle}>
                <AccountBoxIcon style={styleIconColor} />
              </ListItemIcon>
              <Typography>{`${capitalizeWords(
                info.primary_contact_first_name
              )} ${capitalizeWords(
                info.primary_contact_last_name
              )}`}</Typography>
            </ListItem>
            <ListItem disablePadding style={listItemStyle}>
              <ListItemIcon style={centeredStyle}>
                <PhoneIcon style={styleIconColor} />
              </ListItemIcon>
              <Typography>{contactPhone}</Typography>
            </ListItem>
            <ListItem disablePadding style={listItemStyle}>
              <ListItemIcon style={centeredStyle}>
                <EmailIcon style={styleIconColor} />
              </ListItemIcon>
              <Typography>{info.primary_contact_email}</Typography>
            </ListItem>
            <div>
              {/* <OrgContactEdit
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                editedContactInfo={info}
                onSaveChanges={(editedItem) => {
                  // Handle saving changes (make API call, dispatch action, etc.)
                  console.log("New Contact Info:", editedItem);
                  dispatch({ type: "EDIT_CONTACT_INFO", payload: editedItem });
                  setIsEditing(false);
                }}
              /> */}
              <OrgContactEdit
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                info={info}
                onSaveChanges={handleSaveChanges}
              />
              <Button onClick={handleEdit}>Edit</Button>
            </div>
          </List>
          <Divider />
        </Card>
        <Box sx={{ flexGrow: 1 }}></Box>
      </div>
    </>
  );
}
