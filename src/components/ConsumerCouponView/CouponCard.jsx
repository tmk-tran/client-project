import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~ //
import { User } from "../../hooks/reduxStore";
import { border } from "../Utils/colors";
import { redeemCouponSweetAlert } from "../Utils/sweetAlerts";
import { dispatchHook } from "../../hooks/useDispatch";
import { flexCenter, flexRowSpace, centeredStyle } from "../Utils/pageStyles";
import { capitalizeWords, formatDate } from "../Utils/helpers";
// ~~~~~~~~~~ Components ~~~~~~~~~~ //
import BottomSection from "./BottomSection";
import RedeemButton from "./RedeemButton";

const couponPreviewStyle = {
  height: "100px",
  width: "200px",
};

export default function CouponCard({ coupon, i }) {
  const dispatch = dispatchHook();
  console.log(coupon);

  const user = User() || {};
  console.log(user);

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
    <Card key={i} elevation={3} sx={{ mb: 2, width: "75%" }}>
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Box sx={{ ...couponPreviewStyle, ...flexCenter, ...border }}>
            Front
          </Box>
          <Box sx={{ ...couponPreviewStyle, ...flexCenter, ...border }}>
            Back
          </Box>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~ Coupon Details ~~~~~~~~~ */}
          <Box
            sx={{
              flexGrow: 1,
              ...border,
            }}
          >
            <div style={centeredStyle}>
              <Typography variant="body2">{coupon.merchantName}</Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {capitalizeWords(coupon.offer)}
              </Typography>
              <Typography variant="caption" sx={{ lineHeight: 1 }}>
                {coupon.additionalInfo
                  ? capitalizeWords(coupon.additionalInfo)
                  : ""}
              </Typography>
              {/* <Typography variant="caption">
              Expires:{" "}
              {coupon.expiration ? (
                formatDate(coupon.expiration)
              ) : (
                <Typography variant="caption">No expiration set</Typography>
              )}
            </Typography> */}
              <Typography variant="caption">
                {coupon.exclusions ? (
                  <>Exclusions: {coupon.exclusions}</>
                ) : null}
              </Typography>
            </div>
          </Box>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~ Redeem Button ~~~~~~~~~~ */}
          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              ml: "auto",
            }}
          >
            <Box sx={{ mb: 1 }}>
              {coupon.value ? (
                <>Value: ${coupon.value}</>
              ) : (
                <Box sx={{ minHeight: "1.1rem" }}></Box>
              )}
            </Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                handleRedeem(coupon.id, coupon.locationId, user.id)
              }
            >
              Redeem
            </Button>
          </Box> */}
          <RedeemButton coupon={coupon} user={user} handleRedeem={handleRedeem} />
        </Box>
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        {/* ~~~~~~~~~~ Locations Accepted ~~~~~~~~~~ */}
        <BottomSection coupon={coupon} />
      </CardContent>
    </Card>
  );
}
