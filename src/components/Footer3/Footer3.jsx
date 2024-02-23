import { Box, Typography, ThemeProvider, createTheme } from "@mui/material";
import LinksSocial from "../LinksSocial/LinksSocial";
import Footer from "../Footer/Footer";

// Define a custom theme
const theme = createTheme({
  typography: {
    // Set your desired color for the Typography component
    body1: {
      color: "white",
      // Set line height for increased spacing
      lineHeight: 3,
    },
    body2: {
      color: "white",
      lineHeight: 3,
    },
  },
});

export default function Footer3() {
  return (
    <ThemeProvider theme={theme}>
      {/* <div
        style={{
          height: "48px",
          backgroundColor: "#273B91",
          bottom: 0, // Stick it to the bottom of the screen
          width: "100%", // Take up the full width
        }}
      > */}
      <Box
      component="footer"
      sx={{
        p: 2,
        mt: 'auto',
        backgroundColor: '#273B91',
        color: 'white',
        textAlign: 'center',
      }}
    >
        <div className="footer-container">
          <div>
            <Typography variant="body1">
              © 2023 THE PREFERRED SAVINGS GUIDE
            </Typography>
          </div>
          <div className="center-icon-container">
            <div className="center-icon">
              <LinksSocial colors={["white", "white", "white", "white"]} />
            </div>
          </div>
          <div style={{ textAlign: "right", flexGrow: ".5" }}>
            <Typography variant="body1">ALL SALES ARE FINAL</Typography>
          </div>
        </div>
      {/* </div> */}
      </Box>
    </ThemeProvider>
  );
}
