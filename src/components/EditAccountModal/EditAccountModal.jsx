import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Box, TextField, Button, Typography, Grid } from "@mui/material";
import Swal from "sweetalert2";
import InputAdornment from "@mui/material/InputAdornment";
import { border } from "../Utils/colors";

const EditAccountModal = ({ open, handleClose, data, isMerchantList }) => {
  const dispatch = useDispatch();
  const [editedAccount, setEditedAccount] = useState(data);
  console.log(editedAccount);

  useEffect(() => {
    setEditedAccount(data);
  }, [data]);

  const handleChange = (field, value, isMerchant) => {
    setEditedAccount((prev) => ({
      ...prev,
      [isMerchant ? "merchant_name" : field]: value,
    }));
  };

  const handleEditSave = (editedAccount) => {
    if (!isMerchantList) {
      dispatch({ type: "EDIT_ORGANIZATION", payload: editedAccount });
      dispatch({ type: "FETCH_ORGANIZATIONS" });
    } else {
      dispatch({ type: "EDIT_MERCHANT_DETAILS", payload: editedAccount });
      dispatch({ type: "FETCH_MERCHANTS" });
    }
    Swal.fire({
      icon: "success",
      title: "Account Successfully Edited!",
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
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~ MODAL HEADER ~~~~~~~~~~ */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {!isMerchantList ? (
              <span>Edit Organization</span>
            ) : (
              <span>Edit Merchant</span>
            )}
          </Typography>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          <Grid container spacing={2}>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~ ACCOUNT NAME ~~~~~~~~~~ */}
            <Grid item xs={!isMerchantList ? 6 : 12}>
              <TextField
                label={!isMerchantList ? "Organization Name" : "Merchant Name"}
                fullWidth
                value={
                  !isMerchantList
                    ? editedAccount.organization_name
                    : editedAccount.merchant_name
                }
                onChange={(e) =>
                  handleChange(
                    !isMerchantList ? "organization_name" : "merchant_name", // Use "merchant_name" if isMerchantList is true
                    e.target.value,
                    isMerchantList
                  )
                }
              />
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~ ACCOUNT TYPE ORG ONLY) ~~~~~~~~~~ */}
            <Grid item xs={6}>
              {!isMerchantList && (
                <TextField
                  label="Organization Type"
                  fullWidth
                  value={editedAccount.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                />
              )}
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~ ADDRESS ~~~~~~~~~~~ */}
            <Grid item xs={12}>
              <TextField
                label="Address"
                fullWidth
                value={editedAccount.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~ CITY ~~~~~~~~~~~~~~ */}
            <Grid item xs={4}>
              <TextField
                label="City"
                fullWidth
                value={editedAccount.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~ STATE ~~~~~~~~~~~~~~ */}
            <Grid item xs={4}>
              <TextField
                label="State"
                fullWidth
                value={editedAccount.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~~ ZIP ~~~~~~~~~~~~~~ */}
            <Grid item xs={4}>
              <TextField
                label="Zip Code"
                fullWidth
                type="number"
                value={editedAccount.zip}
                onChange={(e) => handleChange("zip", e.target.value)}
              />
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~ LOGO ~~~~~~~~~~~~~~ */}
            <Grid item xs={8}>
              <TextField
                label="Logo URL (optional)"
                fullWidth
                value={editedAccount.organization_logo}
                onChange={(e) =>
                  handleChange("organization_logo", e.target.value)
                }
              />
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~ ORG FEE ~~~~~~~~~~~~~~ */}
            <Grid item xs={4}>
              {!isMerchantList && (
                <TextField
                  type="number"
                  label="Organization Fee"
                  fullWidth
                  value={editedAccount.organization_earnings}
                  onChange={(e) =>
                    handleChange("organization_earnings", e.target.value)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              )}
            </Grid>
          </Grid>
          <br />
          <Button onClick={handleClose} variant="contained" color="primary">
            Cancel
          </Button>{" "}
          <Button
            onClick={() => handleEditSave(editedAccount)}
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

export default EditAccountModal;
