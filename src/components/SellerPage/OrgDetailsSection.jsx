import { Box, Card, CardContent, Typography } from "@mui/material";
import { primaryColor } from "../Utils/colors";
import { border } from "../Utils/colors";

const cardStyle = {
  width: "40%",
};

export default function OrgDetailsSection({ seller }) {
  console.log(seller);
  return (
    <Card elevation={3} sx={cardStyle}>
      <CardContent>
        <Box sx={{ width: "25%", margin: "0 auto" }}>
          <Typography
            variant="body2"
            sx={{
              mb: 1,
              borderBottom: `1px solid ${primaryColor.color}`,
              textAlign: "center",
            }}
          >
            Organization:
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {seller.organization_name}
        </Typography>
        <Typography sx={{ textAlign: "center" }}>{seller.address}</Typography>
        <Typography sx={{ textAlign: "center" }}>
          {seller.city}, {seller.state} {seller.zip}
        </Typography>
      </CardContent>
    </Card>
  );
}
