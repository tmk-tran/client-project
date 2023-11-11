import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import "./OrganizationCard.css";

function OrganizationCard({ organization }) {
  const history = useHistory();

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
