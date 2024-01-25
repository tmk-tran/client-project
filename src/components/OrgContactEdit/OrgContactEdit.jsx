import React, { useEffect, useState } from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import {
  Backdrop,
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import "./OrgContactEdit.css";
// ~~~~~~~~~~ Utils ~~~~~~~~~~
import { modalBtnStyle } from "../Utils/helpers";
import { showSaveSweetAlert } from "../Utils/sweetAlerts";
import { showToast } from "../Utils/toasts";

export default function OrgContactEdit({
  isOpen,
  onClose,
  info,
  onSaveChanges,
  isMerchantTaskPage,
}) {
  // const [orgName, setOrgName] = useState(info.organization_name);
  const [orgName, setOrgName] = useState(
    !isMerchantTaskPage ? info.organization_name : info.merchant_name
  );
  const [orgType, setOrgType] = useState(info.type);
  const [orgAddress, setOrgAddress] = useState(info.address);
  const [orgCity, setOrgCity] = useState(info.city);
  const [orgState, setOrgState] = useState(info.state);
  const [orgZip, setOrgZip] = useState(info.zip);
  const [editedFirstName, setEditedFirstName] = useState(
    info.primary_contact_first_name
  );
  const [editedLastName, setEditedLastName] = useState(
    info.primary_contact_last_name
  );
  const [editedPhone, setEditedPhone] = useState(
    !isMerchantTaskPage
      ? Number(info.primary_contact_phone)
      : Number(info.contact_phone_number)
  );
  const [phoneError, setPhoneError] = useState(false);
  // const [editedEmail, setEditedEmail] = useState(info.primary_contact_email);
  const [editedEmail, setEditedEmail] = useState(!isMerchantTaskPage ? info.primary_contact_email : info.contact_email);
  const [emailError, setEmailError] = useState(false);
  console.log(orgName);

  useEffect(() => {
    // {isMerchantTaskPage ? setOrgName(info.organization_name) : setOrgName(info.merchant_name)}
    // setOrgName(info.organization_name);
    setOrgType(info.type);
    setOrgAddress(info.address);
    setOrgCity(info.city);
    setOrgState(info.state);
    setOrgZip(info.zip);
  }, [info]);

  // useEffect(() => {
  //   if (isMerchantTaskPage) {
  //     // If isMerchantTaskPage is true, setMerchantName to info.merchant_name
  //     setOrgName(info.merchant_name);
  //   } else {
  //     // Otherwise, set organization-related values
  //     setOrgName(info.organization_name);
  //     setOrgType(info.type);
  //     setOrgAddress(info.address);
  //     setOrgCity(info.city);
  //     setOrgState(info.state);
  //     setOrgZip(info.zip);
  //   }
  // }, [info, isMerchantTaskPage]);

  const handleSave = () => {
    // Validate email before saving
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedEmail)) {
      setEmailError(true);
      return; // Do not proceed with saving if email is invalid
    }

    // Validate phone number before saving
    if (!/^[0-9]*$/.test(editedPhone)) {
      setPhoneError(true);
      return;
    }

    const contactInfo = {
      ...info,
      organization_name: orgName,
      type: orgType,
      address: orgAddress,
      city: orgCity,
      state: orgState,
      zip: orgZip,
      primary_contact_first_name: editedFirstName,
      primary_contact_last_name: editedLastName,
      primary_contact_phone: editedPhone,
      primary_contact_email: editedEmail,
    };

    const orgId = contactInfo.organization_id;

    const editedItem = {
      organization_id: orgId,
      organization_name: orgName,
      type: orgType,
      address: orgAddress,
      city: orgCity,
      state: orgState,
      zip: orgZip,
      primary_contact_first_name: editedFirstName,
      primary_contact_last_name: editedLastName,
      primary_contact_phone: editedPhone,
      primary_contact_email: editedEmail,
      organization_id: orgId,
    };

    // from Utils
    // showToast();

    // Sweet Alert
    showSaveSweetAlert();

    // Clear email error if it was previously set
    setEmailError(false);
    // Clear phone number error if it was previously set
    setPhoneError(false);

    onSaveChanges(editedItem);
  };

  const handleReset = () => {
    // Reset form fields to their original values
    setEditedFirstName(info.primary_contact_first_name);
    setEditedLastName(info.primary_contact_last_name);
    setEditedPhone(info.primary_contact_phone);
    setEditedEmail(info.primary_contact_email);
    setEmailError(false);
    setPhoneError(false);
  };

  const handleClose = () => {
    handleReset(); // Reset form fields before closing
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => {}} // Prevent closing on backdrop click
      aria-labelledby="org-contact-edit-modal"
      aria-describedby="org-contact-edit-modal-description"
      BackdropComponent={Backdrop}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ p: 2, textAlign: "center", fontWeight: "bold" }}
        >
          Edit Contact Information
        </Typography>
        <TextField
          label="First Name"
          value={editedFirstName}
          onChange={(e) => setEditedFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          value={editedLastName}
          onChange={(e) => setEditedLastName(e.target.value)}
        />
        <TextField
          label="Phone"
          type="tel"
          inputProps={{
            pattern: "[0-9]*",
            inputMode: "numeric",
          }}
          value={editedPhone}
          onChange={(e) => {
            setEditedPhone(e.target.value);
            setPhoneError(false);
          }}
          error={phoneError}
          helperText={phoneError ? "Invalid phone number" : ""}
        />
        <TextField
          label="Email"
          type="email"
          value={editedEmail}
          onChange={(e) => {
            setEditedEmail(e.target.value);
            setEmailError(false); // Clear email error when typing
          }}
          error={emailError}
          helperText={emailError ? "Invalid email format" : ""}
        />
        <div
          style={modalBtnStyle}
          // style={{
          //   display: "flex",
          //   flexDirection: "row",
          //   justifyContent: "space-between",
          // }}
        >
          <Button className="modal-cancel-btn" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Box>
    </Modal>
  );
}
