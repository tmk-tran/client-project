import React, { useState } from "react";
// ~~~~~~~~~~ Styles ~~~~~~~~~~
import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import "./OrgContactDetails.css";
// ~~~~~~~~~~ Icons ~~~~~~~~~~
import EditNoteIcon from "@mui/icons-material/EditNote";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import OrgContactEdit from "../OrgContactEdit/OrgContactEdit";
import OrgDetailsEdit from "../OrgDetailsEdit/OrgDetailsEdit";
import ContactDetailsList from "../ContactDetailsList/ContactDetailsList";
// ~~~~~~~~~~ Utils ~~~~~~~~~~
import { formatPhoneNumber } from "../Utils/helpers";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";
import ContactDetailsCard from "./ContactDetailsCard";

export default function OrgContactDetails({ info, isMerchantTaskPage }) {
  console.log(info);
  console.log(isMerchantTaskPage);
  const dispatch = dispatchHook();
  // const contactPhone = formatPhoneNumber(info.primary_contact_phone);
  const contactPhone = isMerchantTaskPage
    ? formatPhoneNumber(info.contact_phone_number)
    : formatPhoneNumber(info.primary_contact_phone);
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
    dispatch({ type: "EDIT_ORG_DETAILS", payload: editedItem });
    setIsEditing(false);
  };

  const handleSaveOrgDetails = (editedOrg) => {
    console.log("New Org Details:", editedOrg);
    dispatch({ type: "EDIT_ORG_DETAILS", payload: editedOrg });
  };

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
                  isMerchantTaskPage={isMerchantTaskPage}
                />
              </div>
            </center>
          </div>
          <div className="org-address">
            <div className="org-name-container">
              {!isMerchantTaskPage ? (
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  {info.organization_name}
                </Typography>
              ) : (
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  {info.merchant_name}
                </Typography>
              )}
              {/* <Typography variant="h5" style={{ fontWeight: "bold" }}>
                {info.organization_name}
              </Typography> */}
            </div>
            <Typography>{info.address}</Typography>
            <Typography>
              {info.city}, {info.state} {info.zip}
            </Typography>
          </div>
          <br />
        </div>

        {/* Organization Contact Details Card */}
        {/* <Card
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

          <ContactDetailsList info={info} contactPhone={contactPhone} isMerchantTaskPage={isMerchantTaskPage} />

          <div style={{ marginBottom: "10px" }}>
            <OrgContactEdit
              isOpen={isEditing}
              onClose={() => setIsEditing(false)}
              info={info}
              onSaveChanges={handleSaveContact}
            /> */}
        {/* <Button onClick={handleEditContact}>Edit</Button> */}
        {/* </div>
          <Divider />
        </Card> */}

        <ContactDetailsCard
          contactPhone={contactPhone}
          handleEditContact={handleEditContact}
          handleSaveContact={handleSaveContact}
          info={info}
          isEditing={isEditing}
          isMerchantTaskPage={isMerchantTaskPage}
          isSmallScreen={isSmallScreen}
          setIsEditing={setIsEditing}
        />

        <Box sx={{ flexGrow: 1 }}></Box>
      </div>
    </>
  );
}