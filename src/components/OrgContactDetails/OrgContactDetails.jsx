import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Styles
import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import "./OrgContactDetails.css";
// Icons
import EditNoteIcon from "@mui/icons-material/EditNote";
// Components
import OrgContactEdit from "../OrgContactEdit/OrgContactEdit";
import OrgDetailsEdit from "../OrgDetailsEdit/OrgDetailsEdit";
import ContactDetailsList from "../ContactDetailsList/ContactDetailsList";
// Utils
import { formatPhoneNumber } from "../Utils/helpers";
import { useParams } from "react-router-dom";

export default function OrgContactDetails() {
  const dispatch = useDispatch();
  const id = Number(useParams().id);
  const info = useSelector((store) => store.orgDetailsReducer)
  const auth = useSelector((store) => store.auth)
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
    console.log("New Contact Info:", editedItem);
    dispatch({ type: "EDIT_ORG_DETAILS", payload: {editedOrg: editedItem, auth: auth }});
    setIsEditing(false);
  };

  const handleSaveOrgDetails = (editedOrg) => {
    console.log("New Org Details:", editedOrg);
    dispatch({ type: "EDIT_ORG_DETAILS", payload: {editedOrg: editedOrg, auth: auth }});
  };

  useEffect(() => {
    dispatch({
      type: "FETCH_ORG_DETAILS",
      payload: {id: id, auth: auth},
    });
  }, [])

  return (
    <>
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

          {info.map(info => {
            return (
              <div className="org-address">
                <div className="org-name-container">
                  <Typography variant="h5" style={{ fontWeight: "bold" }}>
                    {info.organization_name}
                  </Typography>
                </div>
                <Typography>{info.address}</Typography>
                <Typography>
                  {info.city}, {info.state} {info.zip}
                </Typography>
              </div>
            )
          })}

              < br />
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
          <div className="contact-info-header">
            <Typography style={{ fontWeight: "bold", marginTop: "15px" }}>
              Contact
            </Typography>

            <div className="contact-info-edit-btn">
              <Button onClick={handleEditContact} sx={{ fontSize: "16px" }}>
                Edit
              </Button>
            </div>
          </div>
          <hr style={{ width: "80%" }} />

          <ContactDetailsList info={info} contactPhone={contactPhone} />

          <div style={{ marginBottom: "10px" }}>
            <OrgContactEdit
              isOpen={isEditing}
              onClose={() => setIsEditing(false)}
              info={info}
              onSaveChanges={handleSaveContact}
            />
            {/* <Button onClick={handleEditContact}>Edit</Button> */}
          </div>
          <Divider />
        </Card>
        <Box sx={{ flexGrow: 1 }}></Box>
      </div>
    </>
  );
}
