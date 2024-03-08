import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Divider,
  Grid,
} from "@mui/material";
// ~~~~~~~~~~~ Components ~~~~~~~~~~~ //
import AddBox from "../AddBoxIcon/AddBoxIcon";
import CloseButton from "../Buttons/CloseButton";
import SelectMenu from "./SelectMenu";
import AddFileButton from "../AddFileButton/AddFileButton";
import ModalButtons from "../Modals/ModalButtons";
import AllLocationsButton from "./AllLocationsButton";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~~ //
import { lineDivider, modalHeaderStyle } from "../Utils/modalStyles";
import { dispatchHook } from "../../hooks/useDispatch";
import { validateWebsiteFormat, validatePhoneNumber } from "../Utils/helpers";
import { border } from "../Utils/colors";
import { flexEnd } from "../Utils/pageStyles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddNewCouponModal({
  onCouponAdd,
  handleCaseTypeChange,
  locations,
}) {
  const dispatch = dispatchHook();
  const paramsObject = useParams();
  console.log(paramsObject);
  console.log(locations);

  const [open, setOpen] = useState(false);
  const [merchantId, setMerchantId] = useState(paramsObject.id);
  const [couponOffer, setCouponOffer] = useState("");
  const [couponValue, setCouponValue] = useState("");
  const [exclusions, setExclusions] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  console.log(selectedLocations);
  const [selectAllLocations, setSelectAllLocations] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [websiteError, setWebsiteError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [offerError, setOfferError] = useState(false);
  console.log(phoneError);
  console.log(couponOffer);
  console.log(couponValue);
  console.log(exclusions);
  console.log(address);
  console.log(city);
  console.log(state);
  console.log(zip);
  console.log(phone);
  console.log(website);
  console.log(additionalInfo);
  console.log(merchantId);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // NEED TO ADD COORDINATES AND REGION_ID AFTER TALKING TO JOE
  const newCouponPayload = {
    merchant_id: Number(merchantId),
    offer: couponOffer,
    value: Number(couponValue),
    exclusions: exclusions,
    additional_info: additionalInfo,
    // selectedLocations: selectedLocations,
  };

  const addCoupon = () => {
    // e.preventDefault(); // Prevent default form submission behavior
    // selectAllLocations ? 

    // Check if required fields are filled
    if (!couponOffer || !phone || !website) {
      // If any required field is empty, set error state or display error message
      // You can set an error state for each required field and display error messages accordingly
      setOfferError(!offerError);
      setPhoneError(!phone);
      setWebsiteError(!website);
      // You can set error states for other required fields in a similar manner
      return; // Prevent further execution of form submission
    }

    const dispatchAction = {
      type: "ADD_COUPON",
      payload: newCouponPayload,
    };
    console.log(dispatchAction);
    dispatch(dispatchAction);

    // Validate phone number before saving
    if (!/^[0-9]*$/.test(phone) && phone.length == 10) {
      setPhoneError(true);
      return;
    }

    // if (phone && !validatePhoneNumber(phone)) {
    //   setPhoneError(true);
    //   return;
    // }

    if (website && !validateWebsiteFormat(website)) {
      setWebsiteError(true);
      return;
    }

    handleCaseTypeChange("New Coupon");
    onCouponAdd();
  };

  const resetForm = () => {
    setCouponOffer("");
    setCouponValue("");
    setExclusions("");
    setAdditionalInfo("");
    setSelectAllLocations(false);
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setPhone("");
    setWebsite("");

    handleClose();
  };

  const handleLocationChange = (locationId) => {
    console.log(locationId);
    setSelectedLocations(locationId);
  };
  console.log(selectedLocations);

  const handleSelect = (boolean) => {
    console.log(boolean);
    setSelectAllLocations(boolean);
  };

  return (
    <div>
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~~~ ADD BUTTON ~~~~~~~~~~ */}
      <AddBox label="Coupon" buttonStyle={{ mb: 2 }} onClick={handleOpen} />
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <Modal
        open={open}
        // onClose={handleClose}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~ HEADER ~~~~~~~~~~ */}
          <Typography variant="h6" sx={modalHeaderStyle}>
            Add Coupon
          </Typography>
          <Typography variant="caption" sx={{}}>
            *required
          </Typography>
          <Divider sx={lineDivider} />
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~ LOCATION SELECT ~~~~~~~ */}
          <SelectMenu
            label="Participating Location"
            locations={locations}
            fullWidth
            selectAllLocations={selectAllLocations}
            onLocationChange={handleLocationChange}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  border: "1px solid rgba(0, 0, 0, 0.23)", // Match the border style
                  borderRadius: "4px", // Match the border radius
                  padding: "6px 10px", // Match the padding
                  marginBottom: "16px", // Match the margin bottom
                }}
              >
                <AllLocationsButton onSelect={handleSelect} />
              </Box>
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* ~~~~~~~~~~ OFFER ~~~~~~~~~~~~ */}
              <TextField
                label="Coupon Offer"
                value={couponOffer}
                onChange={(e) => {
                  setCouponOffer(e.target.value);
                  setOfferError(false);
                }}
                error={offerError}
                helperText={
                  offerError ? "Please enter coupon offer details" : ""
                }
                fullWidth
                sx={{ mb: 2 }}
                required
              />
              {/* </Grid> */}
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* ~~~~~~~~~~ VALUE ~~~~~~~~~~~~ */}
              {/* <Grid item={6}> */}
              <TextField
                label="Coupon Value"
                value={couponValue}
                onChange={(e) => setCouponValue(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* ~~~~~~~~~~ EXCLUSIONS ~~~~~~~~~ */}
              <TextField
                label="Exclusions"
                value={exclusions}
                onChange={(e) => setExclusions(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={6}>
              {/* <Divider sx={{ mt: 2, mb: 2, ...lineDivider}} /> */}

              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* ~~~~~~~~~~~ PHONE ~~~~~~~~~~~~ */}
              <TextField
                label="Phone Number"
                type="number"
                inputProps={{
                  minLength: 10,
                  maxLength: 10,
                  pattern: "[0-9]*",
                  inputMode: "numeric",
                  required: true,
                }}
                value={phone}
                onChange={(e) => {
                  setPhone(Number(e.target.value));
                  setPhoneError(false);
                }}
                error={phoneError}
                helperText={phoneError ? "Invalid phone number" : ""}
                fullWidth
                sx={{ mb: 2 }}
                required
              />
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* ~~~~~~~~~~~ WEBSITE ~~~~~~~~~~~~ */}
              <TextField
                label="Website"
                value={website}
                onChange={(e) => {
                  setWebsite(e.target.value);
                  setWebsiteError(false);
                }}
                inputProps={{
                  required: true,
                }}
                error={websiteError}
                helperText={
                  websiteError
                    ? "Please enter a valid format (e.g., www.example.com)"
                    : ""
                }
                fullWidth
                sx={{ mb: 2 }}
                required
              />
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* ~~~~~~~ ADDITIONAL INFO ~~~~~~~~ */}
              <TextField
                label="Additional Information..."
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                fullWidth
                multiline
                rows={3.6}
                sx={{ mb: 2 }}
              />
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~ LOGO UPLOAD~~~~~~~~~ */}
          </Grid>
          {/* <AddFileButton /> */}
          <ModalButtons
            label="Add"
            onSave={addCoupon}
            onCancel={resetForm}
            width="50%"
          />
        </Box>
      </Modal>
    </div>
  );
}
