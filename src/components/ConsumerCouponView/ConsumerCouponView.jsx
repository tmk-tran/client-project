import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
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
import CouponCard from "./CouponCard";
import SearchBar from "../SearchBar/SearchBar";

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
    <Box sx={{ ...centeredStyle, ...border, ...containerStyle }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", ...centerMe }}>
        Consumer Coupon View
      </Typography>
      <br />
      <Box sx={{ mb: 2, width: "75%", ...flexRowSpace }}>
        <SearchBar isCoupon isOrganization={false} />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Coupons valid mm/yy - mm/yy
        </Typography>
      </Box>
      {/* <Grid container spacing={2}>
        <Grid item xs={6}> */}
      {/* First column */}
      {/* <CouponCard />
          <CouponCard />
          <CouponCard />
          <CouponCard />
        </Grid>
        <Grid item xs={6}> */}
      {/* Second column */}
      {/* <CouponCard />
          <CouponCard />
          <CouponCard />
          <CouponCard />
        </Grid>
      </Grid>
    </Box> */}
      <CouponCard />
      <CouponCard />
      <CouponCard />
      <CouponCard />
      <CouponCard />
      <CouponCard />
      <CouponCard />
      <CouponCard />
    </Box>
  );
}
