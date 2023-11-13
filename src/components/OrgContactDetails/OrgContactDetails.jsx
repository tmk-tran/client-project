import React from "react";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { Typography } from "@mui/material";

import {
  Box,
  Card,
  List,
  ListItem,
  ListItemIcon,
  Divider,
} from "@mui/material";

import ListItemText from "@mui/material/ListItemText";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import {
  centeredStyle,
  formatPhoneNumber,
  listItemStyle,
} from "../Utils/helpers";
import "./OrgContactDetails.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function OrgContactDetails({ info }) {
  const contactPhone = formatPhoneNumber(info.primary_contact_phone);
  const isSmallScreen = useMediaQuery("(max-width:400px)");

  return (
    <>
      <div className="org-details">
        <div className="org-address-container">
          <div>
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
        <Card
          elevation={5}
          sx={{
            maxWidth: 360,
            bgcolor: "background.paper",
            ...(isSmallScreen && {
              maxWidth: "100%", // Adjust styles for smaller screens
            }),
          }}
        >
          <List style={{ width: "60%" }}>
            <ListItem disablePadding style={listItemStyle}>
              <ListItemIcon style={centeredStyle}>
                <AccountBoxIcon />
              </ListItemIcon>
              <Typography>{`${info.primary_contact_first_name}, ${info.primary_contact_last_name}`}</Typography>
            </ListItem>
            <ListItem disablePadding style={listItemStyle}>
              <ListItemIcon style={centeredStyle}>
                <PhoneIcon />
              </ListItemIcon>
              <Typography>{contactPhone}</Typography>
            </ListItem>
            <ListItem disablePadding style={listItemStyle}>
              <ListItemIcon style={centeredStyle}>
                <EmailIcon />
              </ListItemIcon>
              <Typography>{info.primary_contact_email}</Typography>
            </ListItem>
          </List>
          <Divider />
        </Card>
        <Box sx={{ flexGrow: 1 }}></Box>
        {/* </ThemeProvider> */}
      </div>
    </>
  );
}
