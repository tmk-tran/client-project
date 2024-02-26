import React, { useState } from "react";

import { Button, Card, Divider, Typography } from "@mui/material";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import ContactEdit from "../ContactEdit/ContactEdit";
import ContactDetailsList from "../ContactDetailsList/ContactDetailsList";

export default function ContactDetailsCard({
  contactPhone,
  handleEditContact,
  handleSaveContact,
  info,
  isEditing,
  isMerchantTaskPage,
  isSmallScreen,
  setIsEditing,
  isOrgAdminPage,
}) {
  return (
    <Card
      elevation={3}
      sx={{
        maxWidth: 360,
        bgcolor: "background.paper",
        ...(isSmallScreen && {
          maxWidth: "100%", // Adjust styles for smaller screens
        }),
      }}
    >
      <div className="contact-info-header">
        <Typography style={{ fontWeight: "bold", marginTop: "15px" }}>
          Contact
        </Typography>

        <div className="contact-info-edit-btn">
          {!isOrgAdminPage && (
            <Button onClick={handleEditContact} sx={{ fontSize: "16px" }}>
              Edit
            </Button>
          )}
        </div>
      </div>
      <hr style={{ width: "80%" }} />

      <ContactDetailsList
        info={info}
        contactPhone={contactPhone}
        isMerchantTaskPage={isMerchantTaskPage}
      />

      <div style={{ marginBottom: "10px" }}>
        <ContactEdit
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          info={info}
          onSaveChanges={handleSaveContact}
          isMerchantTaskPage={isMerchantTaskPage}
        />
        {/* <Button onClick={handleEditContact}>Edit</Button> */}
      </div>
      <Divider />
    </Card>
  );
}
