import { Card, CardContent, Typography } from "@mui/material";

const cardStyle = {
  width: "50%",
};

export default function OrgDetailsSection({ seller }) {
  console.log(seller);
  return (
    <Card elevation={3} sx={cardStyle}>
      <CardContent>
        Organization info
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {seller.organization_name}
        </Typography>
        <Typography sx={{ textAlign: "center" }}>{seller.address}</Typography>
        <Typography sx={{ textAlign: "center" }}>
          {seller.city}, {seller.state} {seller.zip}
        </Typography>
        {/* <Typography>{seller.state}</Typography>
        <Typography>{seller.zip}</Typography> */}
      </CardContent>
    </Card>
  );
}
