import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { border } from "../Utils/colors";
import { centerDiv } from "../Utils/helpers";

const couponPreviewStyle = {
  height: "80px",
  width: "200px",
};

export default function CouponCard() {
  return (
    <Card elevation={3} sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Box sx={{ ...couponPreviewStyle, ...centerDiv, ...border }}>
            Front
          </Box>
          <Box sx={{ ...couponPreviewStyle, ...centerDiv, ...border }}>
            Back
          </Box>
          <Box
            sx={{
              // display: "flex",
              // alignItems: "center",
              flexGrow: 1,
              ...border,
            }}
          >
            <Typography variant="body2">Merchant Name</Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>Coupon Details</Typography>
            <Typography variant="caption">Expires: mm/dd/yyyy</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
            <Button variant="contained" color="secondary">Redeem</Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
