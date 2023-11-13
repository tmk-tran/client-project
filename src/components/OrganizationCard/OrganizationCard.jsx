import React, { useEffect, useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import "./OrganizationCard.css";

function OrganizationCard({ organization }) {
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const organizationsList = useSelector((store) => store.organizations);

  return (
    <div className="cardContainer">
      <Card
        onClick={() => history.push(`/orgDetails/${organization.id}`)}
        className="organizationCard"
      >
        <CardMedia
          style={{ objectFit: "cover" }}
          className="cardMedia"
          component="img"
          image={organization.organization_logo}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {organization.organization_name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {organization.city}, {organization.state} {organization.zip}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default OrganizationCard;
