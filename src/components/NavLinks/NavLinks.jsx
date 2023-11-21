import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Style
import {
  Typography,
  ThemeProvider,
  createTheme,
  Link as MuiLink,
} from "@mui/material";
import "./NavLinks.css";

// Custom theme for MUI component
const theme = createTheme({
  typography: {
    fontSize: 15,
    fontFamily: "Telugu Sangam MN",
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#273b91", // Customize link color
          // Add other styles for MuiLink here
          textTransform: "uppercase",
          fontFamily: "Telugu Sangam MN",
        },
      },
    },
  },
});

export default function NavLinks() {
  const user = useSelector((store) => store.user);

  return (
    <ThemeProvider theme={theme}>
      <div className="NavLinks-container">
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <div style={{ margin: "0 auto" }}>
                  <Link className="navLink" to="/publicOrgs">
              View Organizations
            </Link>
            <Link className="navLink" to="/login">
              Login / Register
            </Link>
            <Link className="navLink" to="/about">
              About
            </Link>
          </div>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Typography>
              <MuiLink
                component={Link}
                className="main-navlink"
                to="/home"
                underline="hover"
              >
                Home
              </MuiLink>
            </Typography>
            <Typography>
                  <MuiLink
                  component={Link}
                  className="main-navlink"
                  to="/newFundraiser"
                  underline="hover"
                >
                  New Fundraiser
                </MuiLink>
            </Typography>
            <Typography>
              <MuiLink
                component={Link}
                className="main-navlink"
                to="/archivedOrganizations"
                underline="hover"
              >
                Archived Organizations
              </MuiLink>
            </Typography>
            <Typography>
              <MuiLink
                component={Link}
                className="main-navlink"
                to="/about"
                underline="hover"
              >
                About
              </MuiLink>
            </Typography>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
