import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~ //
import { border } from "../Utils/colors";
import {
  containerStyle,
  centeredStyle,
  centerMe,
  flexRowSpace,
} from "../Utils/pageStyles";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~ //
import { dispatchHook } from "../../hooks/useDispatch";
import { couponsData } from "../../hooks/reduxStore";
// ~~~~~~~~~~ Components ~~~~~~~~~ //
import Typography from "../Typography/Typography";
import CouponCard from "./CouponCard";
import SearchBar from "../SearchBar/SearchBar";
import ToggleButton from "../ToggleButton/ToggleButton";

export default function ConsumerCouponView() {
  const dispatch = dispatchHook();

  useEffect(() => {
    const dispatchAction = {
      type: "FETCH_COUPON_FILES",
    };
    dispatch(dispatchAction);
  }, []);

  const coupons = couponsData() || [];
  console.log(coupons);

  return (
    <Box
      sx={{
        ...centeredStyle,
        ...border,
        ...containerStyle,
        position: "relative",
      }}
    >
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~~ Toggle ~~~~~~~~~~ */}
      <Box sx={{ position: "absolute", top: 0, left: 0 }}>
        <ToggleButton />
      </Box>
      {/* ~~~~~~~~~~ Header ~~~~~~~~~~ */}
      <Typography
        label="My Coupons"
        variant="h5"
        sx={{ mt: 2, fontWeight: "bold", ...centerMe }}
      />
      <br />
      <Box sx={{ mb: 2, width: "75%", ...flexRowSpace }}>
        <SearchBar isCoupon isOrganization={false} />
        <Typography
          label="Coupons valid mm/yy - mm/yy"
          variant="body2"
          sx={{ mt: 2 }}
        />
      </Box>
      {coupons ? (
        coupons.map((coupon, i) => <CouponCard key={i} coupon={coupon} />)
      ) : (
        <Typography label="Coupons unavailable" variant="body1" />
      )}
    </Box>
  );
}
