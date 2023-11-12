import React from "react";
import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import { useSelector } from "react-redux";
// Style
import { Typography, ThemeProvider, createTheme } from "@mui/material";
import "./NavLinks.css";

// Custom theme for MUI components
const theme = createTheme({
  typography: {
    fontSize: 18,
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#273b91', // Customize link color
          // Add other styles for MuiLink here
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
          <>
            <Link className="navLink" to="/login">
              Login / Register
            </Link>
            <Link className="navLink" to="/about">
              About
            </Link>
          </>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <MuiLink
              component={Link}
              className="main-navlink"
              to="/home"
              underline="hover"
            >
              <Typography>Home</Typography>
            </MuiLink>
            <Typography>Groups</Typography>
            <Typography>Add New Fundraiser</Typography>
            <MuiLink
              component={Link}
              className="main-navlink"
              to="/about"
              underline="hover"
            >
              <Typography>About</Typography>
            </MuiLink>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
