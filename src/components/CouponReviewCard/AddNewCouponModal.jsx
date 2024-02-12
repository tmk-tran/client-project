import React, { useState } from "react";
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
import { headerDivider, modalHeaderStyle } from "../Utils/modalStyles";
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

export default function AddNewCouponModal({
  onCouponAdd,
  handleCaseTypeChange,
}) {
  const dispatch = dispatchHook();
  const paramsObject = useParams();
  console.log(paramsObject);

  const [open, setOpen] = useState(false);
  const [couponOffer, setCouponOffer] = useState("");
  const [couponValue, setCouponValue] = useState("");
  const [exclusions, setExclusions] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [merchantId, setMerchantId] = useState(paramsObject.id);
  console.log(couponOffer);
  console.log(couponValue);
  console.log(exclusions);
  console.log(address);
  console.log(city);
  console.log(state);
  console.log(zip);
  console.log(phone);
  console.log(website);
  console.log(merchantId);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // NEED TO ADD COORDINATES AND REGION_ID AFTER TALKING TO JOE
  const newCouponPayload = {
    coupon_offer: couponOffer,
    coupon_value: couponValue,
    exclusions: exclusions,
    address: address,
    city: city,
    state: state,
    zip: zip,
    phone: phone,
    website: website,
    merchant_id: merchantId,
  };

  const addCoupon = () => {
    // dispatch({
    //   type: "ADD_COUPON",
    //   payload: newCouponPayload,
    // });

    handleCaseTypeChange("New Coupon");
    onCouponAdd();
  };

  const resetForm = () => {
    setCouponOffer("");
    setCouponValue("");
    setExclusions("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setPhone("");
    setWebsite("");

    handleClose();
  };

  return (
    <div>
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~~~ ADD BUTTON ~~~~~~~~~~ */}
      <AddBox
        label="Coupon"
        buttonStyle={{ mb: 2, ...leftSpace }}
        onClick={handleOpen}
      />
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
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
            Add Coupon
          </Typography>
          <Divider sx={headerDivider} />
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~ OFFER ~~~~~~~~~~~~ */}
          <TextField
            label="Coupon Offer"
            value={couponOffer}
            onChange={(e) => setCouponOffer(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~ VALUE ~~~~~~~~~~~~ */}
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
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~ ADDRESS ~~~~~~~~~~~~ */}
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~ CITY ~~~~~~~~~~~~~~ */}
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~~ STATE ~~~~~~~~~~~ */}
          <TextField
            label="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~~ ZIP ~~~~~~~~~~~~ */}
          <TextField
            label="Additional Details..."
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~~ PHONE ~~~~~~~~~~~~ */}
          <TextField
            label="Additional Details..."
            type="number"
            value={phone}
            onChange={(e) => setPhone(Number(e.target.value))}
            fullWidth
            sx={{ mb: 2 }}
          />
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~~ WEBSITE ~~~~~~~~~~~~ */}
          <TextField
            label="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="secondary"
            sx={hoverAccept}
            fullWidth
            onClick={addCoupon}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
