import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { border } from "../Utils/colors";
import { redeemCouponSweetAlert } from "../Utils/sweetAlerts";
import { dispatchHook } from "../../hooks/useDispatch";
import { flexColumnSpace, flexCenter } from "../Utils/pageStyles";

const couponPreviewStyle = {
  height: "100px",
  width: "200px",
};

export default function CouponCard() {
  const dispatch = dispatchHook();

  const onRedeemClick = (couponId) => {
    const redeemAction = {
      type: "REDEEM_COUPON",
      payload: couponId,
    };
    console.log(redeemAction);
    // dispatch(redeemAction);
  };

  const handleRedeem = () => {
    redeemCouponSweetAlert(() => {
      // onRedeemClick(couponId);
      onRedeemClick();
    });
  };

  return (
    <Card elevation={3} sx={{ mb: 2, width: "75%" }}>
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Box sx={{ ...couponPreviewStyle, ...flexCenter, ...border }}>
            Front
          </Box>
          <Box sx={{ ...couponPreviewStyle, ...flexCenter, ...border }}>
            Back
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              ...flexColumnSpace,
              ...border,
            }}
          >
            <div>
              <Typography variant="body2">Merchant Name</Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Coupon Details
              </Typography>
            </div>
            <Typography variant="caption">Expires: mm/dd/yyyy</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRedeem}
            >
              Redeem
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
