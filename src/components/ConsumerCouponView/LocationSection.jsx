import { Box, Typography } from "@mui/material";
import { capitalizeStateAbbr, capitalizeWords } from "../Utils/helpers";
import { border } from "../Utils/colors";

export default function LocationSection({ coupon }) {
  return (
    <Box>
      <Typography variant="caption">Location Accepted:</Typography>{" "}
      <Typography variant="caption" sx={{ fontWeight: "bold" }}>
        {capitalizeWords(coupon.locationName)} {capitalizeWords(coupon.address)}{" "}
        {capitalizeWords(coupon.city)}, {capitalizeStateAbbr(coupon.state)}{" "}
        {coupon.zip}
      </Typography>
    </Box>
  );
}
