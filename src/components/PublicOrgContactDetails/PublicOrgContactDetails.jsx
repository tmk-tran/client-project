import React from "react";

// Styles
import { Typography, useMediaQuery } from "@mui/material";
import "./PublicOrgContactDetails.css";

export default function PublicOrgContactDetails({ info }) {

  return (
    <>
      <div className="org-details">
        <div className="org-address-container">
          <div></div>
          <div className="org-address">
            <div className="org-name-container">
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                {info.organization_name}
              </Typography>
            </div>
            <Typography>{info.address}</Typography>
            <Typography style={{ marginBottom: "-40px" }}>
              {info.city}, {info.state} {info.zip}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}
