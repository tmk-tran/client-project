import { Box, Typography } from "@mui/material";
import { capitalizeStateAbbr, capitalizeWords } from "../Utils/helpers";
import { border } from "../Utils/colors";

export default function LocationSection({ coupon }) {
  if (
    !coupon ||
    !coupon.locationId ||
    !coupon.locationName ||
    !coupon.address ||
    !coupon.city ||
    !coupon.state ||
    !coupon.zip
  ) {
    return null; // Return null if any of the necessary properties are undefined
  }
  return (
    <Box>
      <Typography variant="caption">Locations Accepted:</Typography>
      {coupon.locationId.map((locationId, index) => (
        <Typography key={index} variant="body2">
          {capitalizeWords(coupon.locationName[index])}{" "}
          {capitalizeWords(coupon.address[index])},{" "}
          {capitalizeWords(coupon.city[index])},{" "}
          {capitalizeStateAbbr(coupon.state[index])} {coupon.zip[index]}
        </Typography>
      ))}
    </Box>
  );
}
