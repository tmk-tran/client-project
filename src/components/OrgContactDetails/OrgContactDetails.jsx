import React from "react";
import { Typography } from "@mui/material";
import { formatPhoneNumber } from "../Utils/helpers";

function OrgContactDetails({ info }) {
  const contactPhone = formatPhoneNumber(info.primary_contact_phone);

  return (
    <div className="org-details" style={{ border: "1px solid black" }}>
      <Typography variant="h6">{info.organization_name}</Typography>
      <Typography>{info.address}</Typography>
      <Typography>{info.city}</Typography>
      <Typography>{info.state}</Typography>
      <Typography>{info.zip}</Typography>
      <Typography>{info.primary_contact_first_name}</Typography>
      <Typography>{info.primary_contact_last_name}</Typography>
      <Typography>{contactPhone}</Typography>
      <Typography>{info.primary_contact_email}</Typography>
    </div>
  );
}

export default OrgContactDetails;
