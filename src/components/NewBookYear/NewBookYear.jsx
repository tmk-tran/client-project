import { Box, Button, Grid, Typography } from "@mui/material";
import { border } from "../Utils/colors";

export default function NewBookYear() {
  const startNewYear = () => {
    console.log("start new year");
  };

  return (
    // <Box sx={border}>
    //   <Typography sx={{ textAlign: "center" }}>Book Year Settings</Typography>
    //   <Box>
    //   <Typography>Start a new coupon book year</Typography>
    //   <Button variant="contained">Start</Button>
    //   </Box>
    // </Box>

    <Grid sx={border}>
      <Grid item xs={12} sx={{ border: "1px solid blue" }}>
        <Typography>Start a new coupon book year</Typography>
      </Grid>
      <Grid item xs={12} sx={{ border: "1px solid blue" }}>
        <Button variant="contained" color="primary" onClick={startNewYear}>
          Start New Year
        </Button>
      </Grid>
    </Grid>
  );
}
