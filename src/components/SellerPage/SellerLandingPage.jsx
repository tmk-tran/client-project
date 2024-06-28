import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Divider, useTheme, useMediaQuery } from "@mui/material";
// ~~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~ //
import { centeredStyle, containerStyle, flexEnd } from "../Utils/pageStyles";
import { sellerPageInfo } from "../../hooks/reduxStore";
import { dispatchHook } from "../../hooks/useDispatch";
import { historyHook } from "../../hooks/useHistory";
// ~~~~~~~~~~~ Components ~~~~~~~~~~~~~~ //
import OrgDetailsSection from "./OrgDetailsSection";
import RefIdDisplay from "./RefIdDisplay";
import PaymentMenu from "./PaymentMenu";

const flexCenter = {
  display: "flex",
  justifyContent: "center",
};

export default function SellerLandingPage() {
  const dispatch = dispatchHook();
  const history = historyHook();
  const paramsObject = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showGoButton, setShowGoButton] = useState(false);
  const [paymentType, setPaymentType] = useState("");

  useEffect(() => {
    dispatch({ type: "FETCH_SELLER_PAGEINFO", payload: paramsObject.refId });
  }, []);

  const sellerData = sellerPageInfo() || [];

  // Props to PaymentMenu //
  const handlePaymentSelect = (paymentType) => {
    setShowGoButton(true);
    setPaymentType(paymentType);
  };

  const navigateTo = () => {
    history.push(`/fargo/seller/${paramsObject.refId}/${paymentType}`);
  };

  return (
    <Box sx={containerStyle}>
      {sellerData.map((seller) => (
        <Box key={seller.id} sx={{ mt: 5, ...centeredStyle }}>
          {/* ~~~~~ OrgDetails ~~~~~ */}
          <OrgDetailsSection isMobile={isMobile} seller={seller} />
          <br />
          {/* ~~~~~ Referral ID ~~~~~ */}
          <Box
            sx={{
              ...flexCenter,
              width: isMobile ? "100%" : "40%",
              borderRadius: "4px",
            }}
          >
            <RefIdDisplay seller={seller} />
          </Box>
          <Divider />
          <br />
          {/* ~~~~~ Payment Method ~~~~~ */}
          <PaymentMenu
            isMobile={isMobile}
            onPaymentSelect={handlePaymentSelect}
          />
          <br />
          {showGoButton && (
            <Box sx={{ width: "40%", ...flexEnd }}>
              <Button variant="contained" onClick={navigateTo} fullWidth>
                Go
              </Button>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
