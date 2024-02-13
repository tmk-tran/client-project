import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
// ~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~~
import { leftSpace } from "../Details/styleDetails";
import { lineDivider, modalHeaderStyle } from "../Utils/modalStyles";
import { hoverAccept } from "../Utils/colors";
import { dispatchHook } from "../../hooks/useDispatch";

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

export default function AddLocationModal({
  onLocationAdd,
  handleCaseTypeChange,
}) {
  const dispatch = dispatchHook();
  const paramsObject = useParams();
  console.log(paramsObject);

  const [open, setOpen] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [merchantId, setMerchantId] = useState(paramsObject.id);
  const [additionalDetails, setAdditionalDetails] = useState("");
  console.log(locationName);
  console.log(phoneNumber);
  console.log(locationAddress);
  console.log(city);
  console.log(state);
  console.log(zip);
  console.log(merchantId);
  console.log(additionalDetails);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // NEED TO ADD COORDINATES AND REGION_ID AFTER TALKING TO JOE
  const newLocationPayload = {
    location_name: locationName,
    phone_number: phoneNumber,
    address: locationAddress,
    city: city,
    state: state,
    zip: zip,
    merchant_id: merchantId,
    additional_details: additionalDetails,
  };

  const addLocation = () => {
    dispatch({
      type: "ADD_LOCATION",
      payload: newLocationPayload,
    });

    handleCaseTypeChange("New Location");
    onLocationAdd();
  };

  const resetForm = () => {
    setLocationName("");
    setPhoneNumber("");
    setLocationAddress("");
    setCity("");
    setState("");
    setZip("");
    setAdditionalDetails("");

    handleClose();
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
          <CloseButton handleClose={resetForm} />
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~ HEADER ~~~~~~~~~~ */}
          <Typography variant="h6" sx={modalHeaderStyle}>
            Add Location
          </Typography>
          <Divider sx={lineDivider} />
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~ NAME ~~~~~~~~~~~~~ */}
          <TextField
            label="Location Name"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
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
          {/* ~~~~~~~~~~ CITY ~~~~~~~~~~~~~ */}
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~ STATE ~~~~~~~~~~~~ */}
          <TextField
            label="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~ ZIP ~~~~~~~~~~~~~~ */}
          <TextField
            label="Zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
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
