import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Box, TextField, Button, Typography, Grid } from "@mui/material";
import Swal from "sweetalert2";
import InputAdornment from "@mui/material/InputAdornment";

const EditOrganizationModal = ({ open, handleClose, organization }) => {
  const [editedOrganization, setEditedOrganization] = useState(organization);
  const dispatch = useDispatch();

  useEffect(() => {
    setEditedOrganization(organization);
  }, [organization]);

  const handleChange = (field, value) => {
    setEditedOrganization((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSave = (editedOrganization) => {
    dispatch({ type: "EDIT_ORGANIZATION", payload: editedOrganization });
    dispatch({ type: "FETCH_ORGANIZATIONS" });
    Swal.fire({
      icon: "success",
      title: "Organization Successfully Edited!",
      showConfirmButton: false,
      timer: 1500, // Adjust the timer as needed
    });
    handleClose();
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
        onClose={handleClose}
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
                label="Organization Name"
                fullWidth
                value={editedOrganization.organization_name}
                onChange={(e) =>
                  handleChange("organization_name", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Organization Type"
                fullWidth
                value={editedOrganization.type}
                onChange={(e) => handleChange("type", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                fullWidth
                value={editedOrganization.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="City"
                fullWidth
                value={editedOrganization.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="State"
                fullWidth
                value={editedOrganization.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Zip Code"
                fullWidth
                type="number"
                value={editedOrganization.zip}
                onChange={(e) => handleChange("zip", e.target.value)}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Logo URL (optional)"
                fullWidth
                value={editedOrganization.organization_logo}
                onChange={(e) =>
                  handleChange("organization_logo", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="number"
                label="Organization Fee"
                fullWidth
                value={editedOrganization.organization_earnings}
                onChange={(e) =>
                  handleChange("organization_earnings", e.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <br />
          <Button onClick={handleClose} variant="contained" color="primary">
            Cancel
          </Button>{" "}
          <Button
            onClick={() => handleEditSave(editedOrganization)}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default EditOrganizationModal;
