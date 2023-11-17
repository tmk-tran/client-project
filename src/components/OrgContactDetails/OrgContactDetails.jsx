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
  styleFlexBox,
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
  useMediaQuery,
} from "@mui/material";
import "./OrgContactDetails.css";
// Component
import OrgContactEdit from "../OrgContactEdit/OrgContactEdit";
import OrgDetailsEdit from "../OrgDetailsEdit/OrgDetailsEdit";
// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrgContactDetails({ info }) {
  const dispatch = useDispatch();
  const contactPhone = formatPhoneNumber(info.primary_contact_phone);
  const isSmallScreen = useMediaQuery("(max-width:400px)");

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingOrgDetails, setIsEditingOrgDetails] = useState(false);

  const handleEditOrg = () => {
    setIsEditingOrgDetails(true);
  };

  const handleEditContact = () => {
    setIsEditing(true);
  };

  const handleSaveContact = (editedItem) => {
    // Dispatch action to update the state or save data
    console.log("New Contact Info:", editedItem);
    dispatch({ type: "EDIT_ORG_DETAILS", payload: editedItem });
    setIsEditing(false);
  };

  const handleSaveOrgDetails = (editedOrg) => {
    // Dispatch action to update the state or save data
    console.log("New Org Details:", editedOrg);
    dispatch({ type: "EDIT_ORG_DETAILS", payload: editedOrg });
  };

  return (
    <>
      {/* Organization Details */}
      <div className="org-details">
        <div className="org-address-container">
          <div>
            <center>
              <div className="org-details-header">
                <div className="edit-icon-btn">
                  <Button onClick={handleEditOrg}>
                    <EditNoteIcon className="edit-note-icon" />
                  </Button>
                </div>
                <OrgDetailsEdit
                  isOpen={isEditingOrgDetails}
                  onClose={() => setIsEditingOrgDetails(false)}
                  info={info}
                  onSaveChanges={handleSaveOrgDetails}
                />
              </div>
            </center>
          </div>
          <div className="org-address">
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              {info.organization_name}
            </Typography>
            <Typography>{info.address}</Typography>
            <Typography>
              {info.city}, {info.state} {info.zip}
            </Typography>
          </div>
          <br />
        </div>

        {/* Organization Contact Details Card */}
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
          <div className="contact-info-header">
            <Typography style={{ fontWeight: "bold", marginTop: "15px" }}>
              Contact
            </Typography>

            <div className="contact-info-edit-btn">
              <Button onClick={handleEditContact}>Edit</Button>
            </div>
          </div>

          <hr style={{ width: "50%" }} />
          <List style={{ padding: "15px", width: "70%", marginTop: "5px" }}>
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
              <Typography>
                <a href={`mailto:${info.primary_contact_email}`}>
                  {info.primary_contact_email}
                </a>
              </Typography>
            </ListItem>
            <div style={{ marginBottom: "10px" }}>
              <OrgContactEdit
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                info={info}
                onSaveChanges={handleSaveContact}
              />
              {/* <Button onClick={handleEditContact}>Edit</Button> */}
            </div>
          </List>
          <Divider />
        </Card>
        <Box sx={{ flexGrow: 1 }}></Box>
      </div>
    </>
  );
}
