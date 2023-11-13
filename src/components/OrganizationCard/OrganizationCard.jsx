import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import "./OrganizationCard.css";

function OrganizationCard({ organization }) {
  const history = useHistory();

  const user = useSelector((store) => store.user);
  const organizationsList = useSelector((store) => store.organizations);

  return (
    <div className="cardContainer">
        <Card elevation={4}
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
            <Typography style={{ fontSize: "1.7em" }} gutterBottom>
              {organization.organization_name}
            </Typography>
            <Typography style={{ fontSize: "1.2em" }} gutterBottom>
              {organization.city}, {organization.state} {organization.zip}
            </Typography>
          </CardContent>
        </Card>

    </div>
  );
}

// this allows us to use <App /> in index.js
export default OrganizationCard;
