import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Divider,
} from "@mui/material";
import AddBox from "../AddBoxIcon/AddBoxIcon";
import CloseButton from "../Buttons/CloseButton";
import { leftSpace } from "../Details/styleDetails";
import { headerDivider, modalHeaderStyle } from "../Utils/modalStyles";
import { hoverAccept } from "../Utils/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddLocationModal({ onLocationAdd, handleCaseTypeChange }) {
  const [open, setOpen] = useState(false);
  const [locationAddress, setLocationAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  console.log(locationAddress);
  console.log(phoneNumber);
  console.log(additionalDetails);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addLocation = () => {
    handleCaseTypeChange("Location");
    onLocationAdd();
  };

  return (
    <div>
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~~~ ADD BUTTON ~~~~~~~~~~ */}
      <AddBox
        label="Location"
        buttonStyle={{ mb: 2, ...leftSpace }}
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* //////////////////////////// */}
          {/* ///~~~ CLOSE BUTTON ~~~~~/// */}
          <CloseButton handleClose={handleClose} />
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~ HEADER ~~~~~~~~~~ */}
          <Typography variant="h6" sx={modalHeaderStyle}>
            Add Location
          </Typography>
          <Divider sx={headerDivider} />
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~ ADDRESS ~~~~~~~~~~ */}
          <TextField
            label="Location Address"
            value={locationAddress}
            onChange={(e) => setLocationAddress(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~ PHONE NUMBER ~~~~~~~~ */}
          <TextField
            label="Phone Number"
            value={phoneNumber}
            type="number"
            onChange={(e) => setPhoneNumber(Number(e.target.value))}
            fullWidth
            sx={{ mb: 2 }}
          />
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~ ADDITIONAL DETAILS ~~~~~~~~ */}
          <TextField
            label="Additional Details..."
            multiline
            rows={3}
            fullWidth
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="secondary"
            sx={hoverAccept}
            fullWidth
            onClick={addLocation}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
