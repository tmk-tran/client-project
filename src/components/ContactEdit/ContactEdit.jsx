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
import "./ContactEdit.css";
// ~~~~~~~~~~ Utils ~~~~~~~~~~
import { modalBtnStyle } from "../Utils/helpers";
import { showSaveSweetAlert } from "../Utils/sweetAlerts";
import { showToast } from "../Utils/toasts";

export default function ContactEdit({
  isOpen,
  onClose,
  info,
  onSaveChanges,
  isMerchantTaskPage,
}) {
  // const [name, setName] = useState(info.organization_name);
  console.log(isOpen);
  console.log(isMerchantTaskPage);
  const [name, setName] = useState(
    !isMerchantTaskPage ? info.organization_name : info.merchant_name
  );
  console.log(name);
  const [orgType, setOrgType] = useState(info.type);
  console.log(orgType);
  const [address, setAddress] = useState(info.address);
  console.log(address);
  const [city, setCity] = useState(info.city);
  console.log(city);
  const [state, setState] = useState(info.state);
  console.log(state);
  const [zip, setZip] = useState(info.zip);
  console.log(zip);
  const [editedFirstName, setEditedFirstName] = useState(
    info.primary_contact_first_name
  );
  console.log(editedFirstName);
  const [editedLastName, setEditedLastName] = useState(
    info.primary_contact_last_name
  );
  console.log(editedLastName);
  const [editedPhone, setEditedPhone] = useState(
    isMerchantTaskPage
      ? Number(info.contact_phone_number)
      : Number(info.primary_contact_phone)
  );
  console.log(editedPhone);
  const [phoneError, setPhoneError] = useState(false);
  console.log(phoneError);
  // const [editedEmail, setEditedEmail] = useState(info.primary_contact_email);
  const [editedEmail, setEditedEmail] = useState(
    !isMerchantTaskPage ? info.primary_contact_email : info.contact_email
  );
  console.log(editedEmail);
  const [emailError, setEmailError] = useState(false);
  console.log(emailError);
  console.log(name);

  useEffect(() => {
    setOrgType(info.type);
    setAddress(info.address);
    setCity(info.city);
    setState(info.state);
    setZip(info.zip);
    !isMerchantTaskPage
      ? setEditedPhone(info.primary_contact_phone)
      : setEditedPhone(info.contact_phone_number);
    !isMerchantTaskPage
      ? setEditedEmail(info.primary_contact_email)
      : setEditedEmail(info.contact_email);
  }, [info, isMerchantTaskPage, isOpen]);

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
    };
    console.log(contactInfo);

    const orgId = contactInfo.organization_id;
    console.log(orgId);
    const merchantId = contactInfo.id;
    console.log(merchantId);

    const editedItem = !isMerchantTaskPage
      ? {
          organization_id: orgId,
          organization_name: name,
          type: orgType,
          address: address,
          city: city,
          state: state,
          zip: zip,
          primary_contact_first_name: editedFirstName,
          primary_contact_last_name: editedLastName,
          primary_contact_phone: editedPhone,
          primary_contact_email: editedEmail,
        }
      : {
          id: merchantId,
          merchant_name: name,
          address: address,
          city: city,
          state: state,
          zip: zip,
          primary_contact_first_name: editedFirstName,
          primary_contact_last_name: editedLastName,
          contact_phone_number: editedPhone,
          contact_email: editedEmail,
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
    console.log(editedItem);
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
