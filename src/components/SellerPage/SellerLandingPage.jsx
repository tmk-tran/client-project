import { Card, CardContent, Typography, TextField } from "@mui/material";

export default function SellerLandingPage() {
  return (
    <>
      <Card>
        <CardContent>Organization info</CardContent>
      </Card>
      <Typography>Referral ID:</Typography>
      <TextField label="Last Name" />
      <TextField label="First Name" />
      <TextField label="Phone Number" type="number" />
    </>
  );
}
