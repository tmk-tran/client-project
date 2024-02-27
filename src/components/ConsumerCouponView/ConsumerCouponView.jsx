import { Box, Grid, Typography } from "@mui/material";
import CouponList from "./CouponList";
import { border } from "../Utils/colors";

export default function ConsumerCouponView() {
  return (
    <Box sx={border}>
      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center" }}>Consumer Coupon View</Typography>
      <Grid container spacing={2}>
      <Grid item xs={6}>
        {/* Content for the first column */}
        <CouponList />
      </Grid>
      <Grid item xs={6}>
        {/* Content for the second column */}
        <CouponList />
      </Grid>
    </Grid>
    </Box>
  );
}
