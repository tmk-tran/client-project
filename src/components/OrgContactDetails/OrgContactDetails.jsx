import React, { useState } from "react";

// Icons
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
// Helpers
import {
  centeredStyle,
  formatPhoneNumber,
  listItemStyle,
} from "../Utils/helpers";
// Styles
import {
  Box,
  Button,
  Card,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Typography,
  TextField,
  useMediaQuery,
} from "@mui/material";
import "./OrgContactDetails.css";
// Component
import OrgContactEdit from "../OrgContactEdit/OrgContactEdit";

export default function OrgContactDetails({ info }) {
  const contactPhone = formatPhoneNumber(info.primary_contact_phone);
  const isSmallScreen = useMediaQuery("(max-width:400px)");

  const [ editContactInfo, setEditContactInfo ] = useState(false);
  const [editFirstName, setEditFirstName] = useState(info.primary_contact_first_name);
  const [editLastName, setEditLastName] = useState(info.primary_contact_last_name);
  const [editPhone, setEditPhone] = useState(info.primary_contact_phone);
  const [editEmail, setEditEmail] = useState(info.primary_contact_email);

  // const editedItem = {
  //   : editGameDate,
  //   game_notes: editGameNotes,
  //   target_name: editTargetName,
  //   target_score_value: editScore,
  //   total_game_score: editTotalScore,
  // };

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

        <OrgContactEdit />
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
            <div>
              <Button onClick={() => setEditContactInfo(!editContactInfo)}>Edit</Button>
            </div>
          </List>
          <Divider />
        </Card>
        <Box sx={{ flexGrow: 1 }}></Box>
      </div>
    </>
  );
}
