import { Box, Card, CardContent, Typography } from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~ //
import { User } from "../../hooks/reduxStore";
import { border, borderPrimaryColor } from "../Utils/colors";
import { redeemCouponSweetAlert } from "../Utils/sweetAlerts";
import { dispatchHook } from "../../hooks/useDispatch";
import { centeredStyle, flexRowSpace } from "../Utils/pageStyles";
import { capitalizeWords } from "../Utils/helpers";
// ~~~~~~~~~~ Components ~~~~~~~~~~ //
import BottomSection from "./BottomSection";
import RedeemButton from "./RedeemButton";
import PdfThumbnail from "../PdfThumbnail/PdfThumbnail";
import NoFile from "./NoFile";
import ThumbView from "./ThumbVIew";

export default function CouponCard({ isMobile, coupon, i }) {
  const dispatch = dispatchHook();
  console.log(coupon);

  const user = User() || {};
  console.log(user);

  const cardStyle = {
    mb: 4,
    width: isMobile ? "100%" : "75%",
    backgroundColor: "#F0F0F0",
  };

  const couponPreviewStyle = {
    height: "150px",
    width: "200px",
  };

  const previewBoxStyle = {
    ...borderPrimaryColor,
    textAlign: "center",
    mb: 1,
    overflow: "hidden",
  };

  const mobilePreviewBox = {
    ...borderPrimaryColor,
    textAlign: "center",
    height: 80,
    overflow: "hidden",
    position: "relative",
    width: "100%",
  };

  const handleRedeem = (couponId, locationId, userId) => {
    console.log(couponId);
    console.log(locationId);
    console.log(userId);
    const saveCall = () => {
      const redeemAction = {
        type: "REDEEM_COUPON",
        payload: {
          couponId,
          locationId,
          userId,
        },
      };
      console.log(redeemAction);
      dispatch(redeemAction);
    };
    redeemCouponSweetAlert(saveCall);
  };

  return (
    <Card key={i} elevation={3} sx={cardStyle}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 1,
          }}
        >
          <ThumbView
            isMobile={isMobile}
            mobilePreviewBox={mobilePreviewBox}
            previewBoxStyle={previewBoxStyle}
            couponPreviewStyle={couponPreviewStyle}
            coupon={coupon}
          />

          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~ Coupon Details ~~~~~~~~~ */}
          {isMobile ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: isMobile ? "100%" : "undefined",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                }}
              >
                <div
                  style={{
                    ...centeredStyle,
                    margin: isMobile ? "0" : "25px auto",
                  }}
                >
                  {/* ~~~~~ NAME ~~~~~ */}
                  <Typography variant="body2">{coupon.merchantName}</Typography>
                  {/* ~~~~~ OFFER ~~~~~ */}
                  <Typography sx={{ fontWeight: "bold" }}>
                    {capitalizeWords(coupon.offer)}
                  </Typography>
                  {/* ~~~~~ ADDITIONAL INFO ~~~~~ */}
                  <Typography variant="caption" sx={{ lineHeight: 1 }}>
                    {coupon.additionalInfo
                      ? capitalizeWords(coupon.additionalInfo)
                      : ""}
                  </Typography>
                  {/* ~~~~~ EXCLUSIONS ~~~~~ */}
                  <Typography
                    variant={"caption"}
                    sx={{
                      fontSize: isMobile ? 12 : "undefined",
                      textAlign: isMobile ? "center" : "undefined",
                    }}
                  >
                    {coupon.exclusions ? (
                      <>Exclusions: {capitalizeWords(coupon.exclusions)}</>
                    ) : null}
                  </Typography>
                </div>
              </Box>
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* ~~~~~~~~~~ Redeem Button ~~~~~~~~~~ */}
              <RedeemButton
                isMobile={isMobile}
                coupon={coupon}
                user={user}
                handleRedeem={handleRedeem}
              />
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  flexGrow: 1,
                }}
              >
                <div style={{ ...centeredStyle, margin: "25px auto" }}>
                  {/* ~~~~~ NAME ~~~~~ */}
                  <Typography variant="body2">{coupon.merchantName}</Typography>
                  {/* ~~~~~ OFFER ~~~~~ */}
                  <Typography sx={{ fontWeight: "bold" }}>
                    {capitalizeWords(coupon.offer)}
                  </Typography>
                  {/* ~~~~~ ADDITIONAL INFO ~~~~~ */}
                  <Typography variant="caption" sx={{ lineHeight: 1 }}>
                    {coupon.additionalInfo
                      ? capitalizeWords(coupon.additionalInfo)
                      : ""}
                  </Typography>
                  {/* ~~~~~ EXCLUSIONS ~~~~~ */}
                  <Typography variant="caption">
                    {coupon.exclusions ? (
                      <>Exclusions: {capitalizeWords(coupon.exclusions)}</>
                    ) : null}
                  </Typography>
                </div>
              </Box>
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* ~~~~~~~~~~ Redeem Button ~~~~~~~~~~ */}
              <RedeemButton
                isMobile={isMobile}
                coupon={coupon}
                user={user}
                handleRedeem={handleRedeem}
              />
            </>
          )}
        </Box>
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        {/* ~~~~~~~~~~ Locations Accepted ~~~~~~~~~~ */}
        <BottomSection isMobile={isMobile} coupon={coupon} />
      </CardContent>
    </Card>
  );
}
