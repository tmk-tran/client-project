import { Box, Button, Grid, Typography } from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~ //
import { border, highlightColor } from "../Utils/colors";
import { bookYear } from "../../hooks/reduxStore";
// ~~~~~~~~~~ Components ~~~~~~~~~~ //
import NewYearForm from "./NewYearForm";
import AvailableYears from "./AvailableYears";
import AvailableYearsButtons from "./AvailableYearsButtons";

const typographyStyle = {
  ...highlightColor,
  textAlign: "center",
  borderRadius: "5px",
};

export default function NewBookYear() {
  const years = bookYear();
  console.log(years);
  const activeYear = years[0].year;
  console.log(activeYear);

  return (
    <Box>
      <Grid container spacing={2}>
        {/* Left column */}
        <Grid item xs={6}>
          <Typography variant="h6" sx={typographyStyle}>
            Current book year: {activeYear}
          </Typography>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography>Start a new coupon book year</Typography>
            <NewYearForm />
          </Box>
        </Grid>
        {/* Right column */}
        <Grid item xs={6}>
          <AvailableYearsButtons years={years} />
        </Grid>
      </Grid>
    </Box>
  );
}
