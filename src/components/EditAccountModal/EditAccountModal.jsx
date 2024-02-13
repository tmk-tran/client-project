import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import Swal from "sweetalert2";
import InputAdornment from "@mui/material/InputAdornment";
// ~~~~~~~~~~~ Hooks ~~~~~~~~~~~
import { border, primaryColor } from "../Utils/colors";
import { modalHeaderStyle, lineDivider } from "../Utils/modalStyles";
// ~~~~~~~~~~~ Components ~~~~~~~~~~~
import CloseButton from "../Buttons/CloseButton";
import {
  capitalizeWords,
  capitalizeFirstWord,
  capitalizeStateAbbr,
  capitalize,
} from "../Utils/helpers";
import AddFileButton from "../AddFileButton/AddFileButton";

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

  const handleFileSelection = (uploadedFile) => {
    console.log(uploadedFile);
    setEditedAccount({ ...editedAccount, uploadedFile });
  };

  const handleEditSave = (editedAccount) => {
    if (!isMerchantList) {
      const payload = { editedAccount };
      console.log(payload);
      dispatch({ type: "EDIT_ORGANIZATION", payload });
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

  const editHeaderStyle = {
    ...lineDivider,
    mb: 5,
  };

  return (
    <div>
      <Modal open={open} onClose={() => {}} >
        <Box sx={style}>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~ MODAL HEADER ~~~~~~~~~~ */}
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ////////////////////////// */}
          {/* ///~~~ CLOSE BUTTON ~~~/// */}
          {/* ////////////////////////// */}
          <CloseButton handleClose={handleClose} />
          {/* ////////////////////////// */}
          <Typography variant="h6" sx={modalHeaderStyle}>
            {!isMerchantList ? (
              <span>Edit Organization</span>
            ) : (
              <span>Edit Merchant</span>
            )}
          </Typography>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          <Divider sx={editHeaderStyle} />
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
                    !isMerchantList ? "organization_name" : "merchant_name",
                    capitalize(e.target.value),
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
                value={capitalize(editedAccount.address)}
                onChange={(e) =>
                  handleChange("address", capitalize(e.target.value))
                }
              />
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~ CITY ~~~~~~~~~~~~~~ */}
            <Grid item xs={4}>
              <TextField
                label="City"
                fullWidth
                value={capitalize(editedAccount.city)}
                onChange={(e) =>
                  handleChange("city", capitalize(e.target.value))
                }
              />
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~ STATE ~~~~~~~~~~~~~~ */}
            <Grid item xs={4}>
              <TextField
                label="State"
                fullWidth
                value={capitalizeStateAbbr(editedAccount.state)}
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
            <Grid item xs={!isMerchantList ? 8 : 12}>
              {/* <TextField
                label="Logo URL (optional)"
                fullWidth
                value={editedAccount.organization_logo}
                onChange={(e) =>
                  handleChange("organization_logo", e.target.value)
                }
              /> */}
              {/* <TextField
                disabled
                // label="Logo (optional)"
                fullWidth
                value={editedAccount.filename ? editedAccount.filename : "No Current Logo"}
                onChange={(e) =>
                  handleChange("organization_logo", e.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddFileButton />
                    </InputAdornment>
                  ),
                }}
              /> */}
              <AddFileButton filename={editedAccount.filename} onFileSelect={handleFileSelection}  />
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
          {/* ///////////////////////// */}
          {/* ///~~~ SAVE BUTTON ~~~/// */}
          {/* ///////////////////////// */}
          <Button
            onClick={() => handleEditSave(editedAccount)}
            variant="contained"
            color="secondary"
            fullWidth
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default EditAccountModal;
