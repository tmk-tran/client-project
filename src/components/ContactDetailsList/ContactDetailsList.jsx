import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
// Utils
import {
  capitalizeWords,
  centerStyle,
  centeredStyle,
  primaryColor,
} from "../Utils/helpers";

export default function ContactDetailsList({ info, contactPhone }) {
  return (
    <List style={{ padding: "15px", width: "70%", marginTop: "5px" }}>
      <ListItem disablePadding style={centerStyle}>
        <ListItemIcon style={centeredStyle}>
          <AccountBoxIcon style={primaryColor} />
        </ListItemIcon>
        <Typography>{`${capitalizeWords(
          info.primary_contact_first_name
        )} ${capitalizeWords(info.primary_contact_last_name)}`}</Typography>
      </ListItem>
      <ListItem disablePadding style={centerStyle}>
        <ListItemIcon style={centeredStyle}>
          <PhoneIcon style={primaryColor} />
        </ListItemIcon>
        <Typography>{contactPhone}</Typography>
      </ListItem>
      <ListItem disablePadding style={centerStyle}>
        <ListItemIcon style={centeredStyle}>
          <EmailIcon style={primaryColor} />
        </ListItemIcon>
        {info.primary_contact_email ? (
          <Typography>
            <a href={`mailto:${info.primary_contact_email}`}>
              {info.primary_contact_email}
            </a>
          </Typography>
        ) : (
          <>
            <Typography>No Email Provided</Typography>
          </>
        )}
      </ListItem>
    </List>
  );
}
