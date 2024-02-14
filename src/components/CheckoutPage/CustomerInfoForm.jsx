import { Typography, Grid, TextField } from "@mui/material";

export default function CustomerInfoForm() {
  return (
    <>
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~~~  Customer Info ~~~~~~~~~~ */}
      <Typography variant="h6" gutterBottom>
        Customer Information
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~  Shipping Address ~~~~~~~~~~ */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Address" variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="City" variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="State" variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Zip" variant="outlined" fullWidth required />
          </Grid>
        </Grid>
      </form>
    </>
  );
}
