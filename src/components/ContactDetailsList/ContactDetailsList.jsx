import React from "react";
import { List, ListItem, ListItemIcon, Typography } from "@mui/material";
// ~~~~~~~~~~ Icons ~~~~~~~~~~
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PublicIcon from "@mui/icons-material/Public";
// ~~~~~~~~~~ Utils ~~~~~~~~~~
import { capitalizeWords, centerStyle, centeredStyle } from "../Utils/helpers";
import { primaryColor } from "../Utils/colors";

export default function ContactDetailsList({
  info,
  contactPhone,
  isMerchantTaskPage,
}) {
  return (
    <List style={{ padding: "15px", width: "70%", marginTop: "5px" }}>
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~~~ CONTACT NAME ~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <ListItem disablePadding style={centerStyle}>
        <ListItemIcon style={centeredStyle}>
          <AccountBoxIcon style={primaryColor} />
        </ListItemIcon>
        <Typography>{`${capitalizeWords(
          info.primary_contact_first_name
        )} ${capitalizeWords(info.primary_contact_last_name)}`}</Typography>
      </ListItem>
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~~~ PHONE NUMBER ~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <ListItem disablePadding style={centerStyle}>
        <ListItemIcon style={centeredStyle}>
          <PhoneIcon style={primaryColor} />
        </ListItemIcon>
        <Typography>{contactPhone}</Typography>
      </ListItem>
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~~~~~ EMAIL ~~~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <ListItem disablePadding style={centerStyle}>
        <ListItemIcon style={centeredStyle}>
          <EmailIcon style={primaryColor} />
        </ListItemIcon>
        {isMerchantTaskPage ? (
          <Typography style={{ maxWidth: "90%", overflowWrap: "break-word" }}>
            {info.contact_email ? (
              <a href={`mailto:${info.contact_email}`}>{info.contact_email}</a>
            ) : (
              <Typography>No Email Provided</Typography>
            )}
          </Typography>
        ) : (
          <Typography>
            {info.primary_contact_email ? (
              <a href={`mailto:${info.primary_contact_email}`}>
                {info.primary_contact_email}
              </a>
            ) : (
              // Render this if no email is provided
              <Typography>No Email Provided</Typography>
            )}
          </Typography>
        )}
      </ListItem>
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~~~~~ WEBSITE ~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {isMerchantTaskPage ? (
        <ListItem disablePadding style={centerStyle}>
          <ListItemIcon style={centeredStyle}>
            <PublicIcon style={primaryColor} />
          </ListItemIcon>
          <Typography>
            {info.website ? (
              <a href={info.website} target="_blank" rel="noopener noreferrer">
                {info.website}
              </a>
            ) : (
              <Typography>No Website Provided</Typography>
            )}
          </Typography>
        </ListItem>
      ) : null}
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
    </List>
  );
}
