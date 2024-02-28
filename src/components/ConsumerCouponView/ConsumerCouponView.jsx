import { Box, Grid, Typography } from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~ //
import { border } from "../Utils/colors";
import {
  containerStyle,
  centeredStyle,
  centerMe,
  flexRowSpace,
} from "../Utils/pageStyles";

// ~~~~~~~~~~ Components ~~~~~~~~~ //
import CouponCard from "./CouponCard";
import SearchBar from "../SearchBar/SearchBar";

export default function ConsumerCouponView() {
  return (
    <Box sx={{ ...centeredStyle, ...border, ...containerStyle }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", ...centerMe }}>
        Consumer Coupon View
      </Typography>
      <br />
      <Box sx={{ width: "75%", ...border, ...flexRowSpace }}>
        <SearchBar isCoupon isOrganization={false} />
        <Typography>Coupons valid mm/yy - mm/yy</Typography>
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
