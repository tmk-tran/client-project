import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
  Button,
} from "@mui/material";
import "./OrganizationCard.css";
import Swal from "sweetalert2";

function OrganizationCard({ organization }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const organizationsList = useSelector((store) => store.organizations);

  const handleArchive = (organizationId) => {
    Swal.fire({
      title: "Are you sure you want to Archive this Organization?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Archive It",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "DELETE_ORGANIZATION", payload: organizationId });
        dispatch({ type: "FETCH_ORGANIZATIONS" });
        // dispatch({ type: "FETCH_ARCHIVED_CUSTOMERS" });
        Swal.fire("Organization Successfully Archived!");
      }
    });
  };

  return (
    <div className="organizationCardContainer">
      <Card
        elevation={4}
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
      <center><Button onClick={() => handleArchive(organization.id)}>Archive</Button></center>
    </div>
  );
  
}

// this allows us to use <App /> in index.js
export default OrganizationCard;
