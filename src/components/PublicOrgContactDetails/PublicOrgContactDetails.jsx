import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Icons
import EditNoteIcon from "@mui/icons-material/EditNote";
// Helpers
import { formatPhoneNumber } from "../Utils/helpers";
// Styles
import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import './PublicOrgContactDetails.css'
// Component
import OrgContactEdit from "../OrgContactEdit/OrgContactEdit";
import OrgDetailsEdit from "../OrgDetailsEdit/OrgDetailsEdit";
import ContactDetailsList from "../ContactDetailsList/ContactDetailsList";

export default function PublicOrgContactDetails({ info }) {
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
          </div>
          <div className="org-address">
            <div className="org-name-container">
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                {info.organization_name}
              </Typography>
            </div>
            <Typography>{info.address}</Typography>
            <Typography style={{ marginBottom: "-40px" }}>
              {info.city}, {info.state} {info.zip}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}
