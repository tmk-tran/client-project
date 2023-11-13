import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { formatPhoneNumber } from "../Utils/helpers";
import "./OrgContactDetails.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function OrgContactDetails({ info }) {
  const contactPhone = formatPhoneNumber(info.primary_contact_phone);

  return (
    <>
      <div className="org-details" style={{ border: "1px solid black" }}>
        <div className="org-address-container">
          <div style={{ border: "1px solid black" }}>
            <center>
              <Typography variant="h6">{info.organization_name}</Typography>
              <Typography>{info.type}</Typography>
            </center>
          </div>
          <div className="org-address">
            <center>
              <Typography>{info.address}</Typography>
              <Typography>
                {info.city}, {info.state} {info.zip}
              </Typography>
            </center>
          </div>
        </div>

        {/* <ThemeProvider theme={darkTheme}> */}
        {/* <Box sx={{ flexGrow: 1 }}></Box> */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            border: "1px solid black",
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText
                primary={`${info.primary_contact_first_name}, ${info.primary_contact_last_name}`}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText primary={contactPhone} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <Typography>{info.primary_contact_email}</Typography>
            </ListItem>
          </List>
          <Divider />
        </Box>
        {/* </ThemeProvider> */}
      </div>
    </>
  );
}

export default OrgContactDetails;
