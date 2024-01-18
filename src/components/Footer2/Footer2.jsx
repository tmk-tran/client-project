import { Typography, ThemeProvider, createTheme } from "@mui/material";
import LinksSocial from "../LinksSocial/LinksSocial";

// Define a custom theme
const theme = createTheme({
  typography: {
    // Set your desired color for the Typography component
    body1: {
      color: "white",
      // Set line height for increased spacing
      lineHeight: 2,
      // Set margin bottom for even space between words vertically
      marginBottom: 8,
    },
    body2: {
      color: "white",
      lineHeight: 2,
      marginBottom: 8,
    },
  },
});

export default function Footer2() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: "235px", backgroundColor: "#273B91" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid white",
              width: "70vw",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <LinksSocial colors={["white", "white", "white", "white"]} />
              </div>
              <br />
              <br />
              <Typography variant="body2">
                © 2023 THE PREFERRED SAVINGS GUIDE
              </Typography>
            </div>

            <div>
              <Typography sx={{ textDecoration: "underline" }}>
                Information
              </Typography>
              <Typography variant="body2">Support a Group</Typography>
              <Typography variant="body2">Fundraisers</Typography>
              <Typography variant="body2">Advertise in the Guide</Typography>
            </div>

            <div>
              <Typography sx={{ textDecoration: "underline" }}>Help</Typography>
              <Typography variant="body2">Contact Us</Typography>
              <Typography variant="body2">Book Table of Contents</Typography>
            </div>

            <div>
              <Typography sx={{ textDecoration: "underline" }}>
                The Preferred Savings Guide
              </Typography>
              <Typography variant="body2">About PSG</Typography>
              <Typography variant="body2">Businesses / Merchants</Typography>
              <Typography variant="body2">Organizations / Groups</Typography>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
