import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { capitalizeStateAbbr, capitalizeWords } from "../Utils/helpers";

export default function LocationSection({ coupon }) {
  if (
    !coupon ||
    !coupon.locationId ||
    !coupon.locationName ||
    !coupon.address ||
    !coupon.city ||
    !coupon.state ||
    !coupon.zip
  )
    return null;

  return (
    <Accordion sx={{ width: "100%" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="caption">Locations Accepted:</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {coupon.locationId.map((locationId, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ textAlign: "center" }}
            >
              {capitalizeWords(coupon.locationName[index])}{" "}
              {capitalizeWords(coupon.address[index])},{" "}
              {capitalizeWords(coupon.city[index])},{" "}
              {capitalizeStateAbbr(coupon.state[index])} {coupon.zip[index]}
            </Typography>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
