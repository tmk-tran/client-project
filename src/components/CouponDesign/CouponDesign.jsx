import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { historyHook } from "../../hooks/useHistory";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import CouponViewer from "../CouponViewer/CouponViewer";

export default function Merchant() {
  const dispatch = useDispatch();
  const history = historyHook();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // Store
  const couponFiles = useSelector((store) => store.coupon);
  console.log(couponFiles); // confirmed

  useEffect(() => {
    dispatch({
      type: "FETCH_COUPON_FILES",
    });
  }, [dispatch]);

  return (
    <div className={`details-container ${isSmallScreen ? "small-screen" : ""}`}>
      <Card className="details-card" elevation={3}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Coupon
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            upload PDFs here
          </div>
          {couponFiles.map((file, i) => (
            <div key={i}>
              {file.filename}
              <CouponViewer couponId={file.id} />
              <button onClick={() => history.push(`/coupon/${file.id}`)}>
                View
              </button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
