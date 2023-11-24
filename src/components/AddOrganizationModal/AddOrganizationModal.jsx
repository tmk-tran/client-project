import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Modal, TextField, Typography, Grid } from "@mui/material";
import Swal from "sweetalert2";
import InputAdornment from "@mui/material/InputAdornment";

export default function AddOrganizationModal({ open, handleModalClose }) {
  const dispatch = useDispatch();
  const [organizationName, setOrganizationName] = useState("");
  const [organizationType, setOrganizationType] = useState("");
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

  const handleSave = () => {
    dispatch({
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
    });
    clearFields();
    handleModalClose();
    Swal.fire({
      icon: "success",
      title: "Organization Successfully Added!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

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

  const cancelAdd = () => {
    clearFields();
    handleModalClose();
  };

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

  return (
    <div>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Organization
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                label="Organization Name"
                fullWidth
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                label="Organization Type"
                fullWidth
                value={organizationType}
                onChange={(e) => setOrganizationType(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Address"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                label="City"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                label="State"
                fullWidth
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Grid>
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
            <Grid item xs={6}>
              <TextField
                label="Contact First Name"
                fullWidth
                value={contactFirstName}
                onChange={(e) => setContactFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                label="Contact Last Name"
                fullWidth
                value={contactLastName}
                onChange={(e) => setContactLastName(e.target.value)}
              />
            </Grid>
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
            <Grid item xs={6}>
              <TextField
                label="Contact Email (optional)"
                fullWidth
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Logo URL (optional)"
                fullWidth
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Organization Earnings"
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
          </Grid>
          <br />
          <Button onClick={cancelAdd} variant="outlined" color="primary">
            Cancel
          </Button>{" "}
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
