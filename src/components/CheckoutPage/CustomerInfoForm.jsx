import { Typography, Grid, Paper, TextField, Divider } from "@mui/material";
import StateSelector from "../StateSelector/StateSelector";
import { containerStyle } from "./CheckoutPage";
import { border } from "../Utils/colors";

export default function CustomerInfoForm() {
  return (
    // <Paper sx={containerStyle}>
      <div style={{ width: "90%", marginLeft: 15, ...border }}>
        {/* ~~~~~~~~~~ Header ~~~~~~~~~~~~~~ */}
        <Typography variant="h6" sx={{ ml: 3, mt: 3 }}>
          Customer Information
        </Typography>
        <hr />
        <form style={{ marginTop: 22 }}>
          <Grid container spacing={2}>
            {/* ~~~~~~~~~~ First Name ~~~~~~~~~~~~~~~~~ */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            {/* ~~~~~~~~~~ Last Name ~~~~~~~~~~~~~~~~~ */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            {/* ~~~~~~~~~~~~~ Email ~~~~~~~~~~~~~~~~~~ */}
            <Grid item xs={12} sm={6}>
              <TextField label="Email" variant="outlined" fullWidth required />
            </Grid>
            {/* ~~~~~~~~~ Phone Number ~~~~~~~~~~~~~~~ */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~ Shipping Address ~~~~~~~~~~ */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ ml: 3 }}>
                Address
              </Typography>
              <hr />
            </Grid>
              {/* <Divider sx={{ ml: 3, ...lineDivider}} /> */}
            {/* ~~~~~~~~~~ Address ~~~~~~~~~~~~~~~~~~~~ */}
            <Grid item xs={8}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            {/* ~~~~~~~~~~ Apt, Unit, Suite ~~~~~~~~~~ */}
            <Grid item xs={4}>
              <TextField
                label="Apt, Unit, Suite"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            {/* ~~~~~~~~~~ City  ~~~~~~~~~~~~~~~~ */}
            <Grid item xs={12} sm={6}>
              <TextField label="City" variant="outlined" fullWidth required />
            </Grid>
            {/* ~~~~~~~~~~ State ~~~~~~~~~~~~~~~~~~~~ */}
            <Grid item xs={12} sm={2}>
              {/* <TextField label="State" variant="outlined" fullWidth required /> */}
              <StateSelector />
            </Grid>
            {/* ~~~~~~~~~~ Zip ~~~~~~~~~~~~~~~~~~~~ */}
            <Grid item xs={12} sm={4}>
              <TextField label="Zip" variant="outlined" fullWidth required />
            </Grid>
          </Grid>
        </form>
      </div>
    // </Paper>
  );
}
