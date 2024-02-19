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
import DetailsEdit from "../DetailsEdit/DetailsEdit";
import ContactDetailsCard from "./ContactDetailsCard";
// ~~~~~~~~~~ Utils ~~~~~~~~~~
import { capitalizeWords, formatPhoneNumber } from "../Utils/helpers";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";
import { border } from "../Utils/colors";

export default function ContactDetails({ info, isMerchantTaskPage }) {
  console.log(info);
  console.log(isMerchantTaskPage);
  const dispatch = dispatchHook();
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
    isMerchantTaskPage
      ? dispatch({ type: "EDIT_MERCHANT_DETAILS", payload: editedItem })
      : dispatch({ type: "EDIT_ORG_DETAILS", payload: editedItem });
    setIsEditing(false);
  };

  const handleSaveOrgDetails = (editedDetails) => {
    console.log("New Details:", editedDetails);
    isMerchantTaskPage
      ? dispatch({ type: "EDIT_MERCHANT_DETAILS", payload: editedDetails })
      : dispatch({ type: "EDIT_ORG_DETAILS", payload: editedDetails });
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
                <DetailsEdit
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
                  {capitalizeWords(info.organization_name)}
                </Typography>
              ) : (
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  {capitalizeWords(info.merchant_name)}
                </Typography>
              )}
            </div>
            <Typography>{capitalizeWords(info.address)}</Typography>
            <Typography>
              {capitalizeWords(info.city)}, {info.state.toUpperCase()}{" "}
              {info.zip}
            </Typography>
          </div>
          <br />
        </div>
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        {/* ~~~~~ Contact Details Card ~~~~~~ */}
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
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
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <Box sx={{ flexGrow: 1 }}></Box>
      </div>
    </>
  );
}
