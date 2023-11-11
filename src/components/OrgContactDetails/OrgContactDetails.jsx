import React from "react";
import { Typography } from "@mui/material";

function OrgContactDetails({ info }) {
  return (
    <div className="org-details">
      <Typography variant="h6">{info.organization_name}</Typography>
      <Typography>{info.address}</Typography>
      <Typography>{info.city}</Typography>
      <Typography>{info.state}</Typography>
      <Typography>{info.zip}</Typography>
      <Typography>{info.primary_contact_first_name}</Typography>
      <Typography>{info.primary_contact_last_name}</Typography>
      <Typography>{info.primary_contact_phone}</Typography>
      <Typography>{info.primary_contact_email}</Typography>
    </div>
  );
}

export default OrgContactDetails;
