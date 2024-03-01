import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// ~~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~ //
import { Box, Button } from "@mui/material";
import { centeredStyle, containerStyle, flexEnd } from "../Utils/pageStyles";
import { border } from "../Utils/colors";
import { sellerPageInfo } from "../../hooks/reduxStore";
import { dispatchHook } from "../../hooks/useDispatch";
// ~~~~~~~~~~~ Components ~~~~~~~~~~~~~~ //
import CustomerNameInfo from "./CustomerNameInfo";
import OrgDetailsSection from "./OrgDetailsSection";
import RefIdDisplay from "./RefIdDisplay";
import PaymentMenu from "./PaymentMenu";

const flexCenter = {
  display: "flex",
  justifyContent: "center",
};

export default function SellerLandingPage() {
  const dispatch = dispatchHook();
  const paramsObject = useParams();
  console.log(paramsObject);
  const [showGoButton, setShowGoButton] = useState(false);
  console.log(showGoButton);

  useEffect(() => {
    dispatch({ type: "FETCH_SELLER_PAGEINFO", payload: paramsObject.refId });
  }, []);

  const sellerData = sellerPageInfo() || [];
  console.log(sellerData);

  // Props to PaymentMenu //
  const handlePaymentSelect = () => {
    setShowGoButton(true);
  };

  return (
    <Box sx={containerStyle}>
      {sellerData.map((seller) => (
        <Box key={seller.id} sx={centeredStyle}>
          <OrgDetailsSection seller={seller} />
          <br />
          <Box sx={{ width: "50%", ...border }}>
            <RefIdDisplay seller={seller} />
          </Box>
          <br />
          <PaymentMenu onPaymentSelect={handlePaymentSelect} />
          <br />
          {showGoButton && (
            <Box sx={{ width: "50%", ...flexEnd }}>
              <Button variant="contained">Go</Button>
            </Box>
          )}
          {/* <CustomerNameInfo /> */}
        </Box>
      ))}
    </Box>
  );
}
