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
import Swal from "sweetalert2";


function ArchivedOrganizationCard({ organization }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

function unArchive(organizationId){
    Swal.fire({
      title: "Are you sure you want to Un-Archive this Organization?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Un-Archive It",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "RESET_ORGANIZATION", payload: organizationId });
        dispatch({ type: "FETCH_ORGANIZATIONS" });
        dispatch({ type: "FETCH_ARCHIVED_ORGANIZATIONS" });
        Swal.fire("Organization Successfully Un-Archived!");
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
      <center><Button onClick={() => unArchive(organization.id)}>Un-Archive</Button></center>
    </div>
  );
  
}

// this allows us to use <App /> in index.js
export default ArchivedOrganizationCard;
