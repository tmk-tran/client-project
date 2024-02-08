import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Swal from "sweetalert2";
import InputAdornment from "@mui/material/InputAdornment";
import CloseButton from "../Buttons/CloseButton";
// ~~~~~~~~~~~ Hooks ~~~~~~~~~~~
import { headerDivider, modalHeaderStyle } from "../Utils/modalStyles";
import { hoverAccept, primaryColor } from "../Utils/colors";

export default function AddOrganizationModal({
  open,
  handleModalClose,
  isMerchantList,
}) {
  console.log(isMerchantList);
  const dispatch = useDispatch();

  // Set state for the add organization form
  const [organizationName, setOrganizationName] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [merchantName, setMerchantName] = useState("");
  console.log(merchantName);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [contactFirstName, setContactFirstName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [orgEarnings, setOrgEarnings] = useState(10);

  // Save function to dispatch data for new organization
  const handleSave = () => {
    !isMerchantList
      ? dispatch({
          type: "ADD_ORGANIZATION",
          payload: {
            organization_name: organizationName,
            type: organizationType,
            address,
            city,
            state,
            zip,
            primary_contact_first_name: contactFirstName,
            primary_contact_last_name: contactLastName,
            primary_contact_phone: contactPhone,
            primary_contact_email: contactEmail,
            organization_logo: logoUrl,
            organization_earnings: orgEarnings,
          },
        })
      : dispatch({
          type: "ADD_MERCHANT",
          payload: {
            merchant_name: merchantName,
            address,
            city,
            state,
            zip,
            primary_contact_first_name: contactFirstName,
            primary_contact_last_name: contactLastName,
            contact_phone_number: contactPhone,
            contact_email: contactEmail,
            merchant_logo: logoUrl,
            organization_earnings: orgEarnings,
          },
        });
    // clear input fields
    clearFields();
    // close modal
    handleModalClose();
    // sweet alerts to confirm addition of organization
    Swal.fire({
      icon: "success",
      title: "Organization Successfully Added!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // clear input fields function
  const clearFields = () => {
    setOrganizationName("");
    setOrganizationType("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setContactFirstName("");
    setContactLastName("");
    setContactPhone("");
    setContactEmail("");
    setLogoUrl("");
    setOrgEarnings(10);
  };

  // cancel adding organization which clears the input fields and closes the modal
  const cancelAdd = () => {
    clearFields();
    handleModalClose();
  };

  // modal style, styled here not in the css file
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85%", // Adjusted width for smaller screens
    maxWidth: 600, // Maximum width for larger screens
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const dividerMarginTop = {
    ...headerDivider,
    mt: 3,
    ml: 2,
    width: "98%",
  };

  // function to capitalize the first letter of whatever you wrap in this
  const capitalizeFirstLetter = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~~~ HEADER ~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ///~~ CLOSE BUTTON ~~/// */}
          <CloseButton handleClose={cancelAdd} />
          {/* ///~~~~~~~~~~~~~~~~~~/// */}
          <Typography variant="h6" sx={modalHeaderStyle}>
            {!isMerchantList ? "Add New Organization" : "Add New Merchant"}
          </Typography>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          <Divider sx={headerDivider} />
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Name / Location
              </Typography>
            </Grid>
            <Grid item xs={!isMerchantList ? 6 : 12}>
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* ~~~~~~~~~~~~ NAME ~~~~~~~~~~~~~~~~~~ */}
              <TextField
                required
                label={!isMerchantList ? "Organization Name" : "Merchant Name"}
                fullWidth
                value={!isMerchantList ? organizationName : merchantName}
                onChange={(e) => {
                  !isMerchantList
                    ? setOrganizationName(capitalizeFirstLetter(e.target.value))
                    : setMerchantName(capitalizeFirstLetter(e.target.value));
                }}
              />
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~ TYPE ~~~~~~~~~~~~~~~~~~ */}
            {!isMerchantList ? (
              <Grid item xs={6}>
                <TextField
                  required
                  label="Organization Type"
                  fullWidth
                  value={organizationType}
                  onChange={(e) => setOrganizationType(e.target.value)}
                />
              </Grid>
            ) : null}
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~ ADDRESS ~~~~~~~~~~~~~~~ */}
            <Grid item xs={12}>
              <TextField
                required
                label="Address"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~ CITY ~~~~~~~~~~~~~~~~~~ */}
            <Grid item xs={4}>
              <TextField
                required
                label="City"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~ STATE ~~~~~~~~~~~~~~~~~ */}
            <Grid item xs={4}>
              <TextField
                required
                label="State"
                fullWidth
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~ ZIP ~~~~~~~~~~~~~~~~~~ */}
            <Grid item xs={4}>
              <TextField
                required
                label="Zip Code"
                fullWidth
                value={zip}
                type="number"
                onChange={(e) => setZip(Number(e.target.value))}
              />
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* <Divider sx={dividerMarginTop}  /> */}
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* //////////////////////////////////// */}
            {/* ////////// CONTACT INFO //////////// */}
            {/* //////////////////////////////////// */}
            <Divider sx={dividerMarginTop} />
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Primary Contact
              </Typography>
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~ FIRST NAME~~~~~~~~~~~~~ */}
            <Grid item xs={6}>
              <TextField
                label="Contact First Name"
                fullWidth
                value={contactFirstName}
                onChange={(e) => setContactFirstName(e.target.value)}
              />
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~ LAST NAME ~~~~~~~~~~~~~ */}
            <Grid item xs={6}>
              <TextField
                required
                label="Contact Last Name"
                fullWidth
                value={contactLastName}
                onChange={(e) => setContactLastName(e.target.value)}
              />
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~ PHONE ~~~~~~~~~~~~~~~~~ */}
            <Grid item xs={6}>
              <TextField
                required
                label="Contact Phone"
                fullWidth
                value={contactPhone}
                type="number"
                onChange={(e) => setContactPhone(Number(e.target.value))}
              />
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~ EMAIL ~~~~~~~~~~~~~~~~~ */}
            <Grid item xs={6}>
              <TextField
                label="Contact Email (optional)"
                fullWidth
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~ LOGO ~~~~~~~~~~~~~~~~~~ */}
            <Grid item xs={!isMerchantList ? 8 : 12}>
              <TextField
                label="Logo URL (optional)"
                fullWidth
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
              />
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~ ORG FEE ~~~~~~~~~~~~~~~ */}
            {!isMerchantList ? (
              <Grid item xs={4}>
                <TextField
                  label="Organization Fee"
                  fullWidth
                  value={orgEarnings}
                  onChange={(e) => setOrgEarnings(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            ) : null}
          </Grid>
          <br />
          {/* <Button onClick={cancelAdd} variant="outlined" color="primary">
            Cancel
          </Button>{" "} */}
          <Button
            onClick={handleSave}
            variant="contained"
            color="secondary"
            sx={hoverAccept}
            fullWidth
          >
            <AddBoxIcon sx={{ mr: 2 }} />
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
