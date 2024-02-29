import React, { useState } from "react";

import CustomerNameInfo from "./CustomerNameInfo";
import OrgDetailsSection from "./OrgDetailsSection";
import RefIdDisplay from "./RefIdDisplay";
// import PaymentMenu from "./PaymentMenu";
import { Box, Button } from "@mui/material";
import { centeredStyle, containerStyle, flexEnd } from "../Utils/pageStyles";
import { border } from "../Utils/colors";
import { oSellers } from "../../hooks/reduxStore";

const flexCenter = {
  display: "flex",
  justifyContent: "center",
};

export default function SellerLandingPage() {
  const [showGoButton, setShowGoButton] = useState(false);
  console.log(showGoButton);

  const sellerData = oSellers() || [];
  console.log(sellerData);

  // Props to PaymentMenu //
  const handlePaymentSelect = () => {
    setShowGoButton(true);
  };

  return (
    <Box sx={containerStyle}>
      <Box sx={centeredStyle}>
        {/* <Box sx={flexCenter}> */}
        <OrgDetailsSection />
        {/* </Box> */}
        <br />
        <Box sx={{ width: "50%", ...border }}>
          <RefIdDisplay />
        </Box>
        <br />

        {/* <PaymentMenu onPaymentSelect={handlePaymentSelect} /> */}
        <br />
        {showGoButton && (
        <Box sx={{ width: "50%", ...flexEnd }}>
          <Button variant="contained">Go</Button>
        </Box>
        )}
        {/* <CustomerNameInfo /> */}
      </Box>
    </Box>
  );
}
