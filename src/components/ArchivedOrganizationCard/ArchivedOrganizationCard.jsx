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
  function goToDetails() {
    history.push(`/orgDetails/${organization.id}`);
  }
  const renderLogoOrInitials = () => {
    if (organization.organization_logo) {
      return (
        <img
          className="logoImage"
          src={organization.organization_logo}
          alt="Organization Logo"
        />
      );
    } else {
      // If no logo, display initials of organization name
      const initials = organization.organization_name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();

      return <div className="initialsContainer">{initials}</div>;
    }
  };

  return (
    <>
    <Card className="organizationListContainer">
      <CardContent>
        <div className="organizationClickable" onClick={goToDetails}>
          <div className="organizationHeader">
            {renderLogoOrInitials()}
            <div className="organizationDetails">
              <h2 style={{marginTop: "0px"}}className="media-header">
                {organization.organization_name}
              </h2>
              <div>Total Groups: {organization.total_groups}</div>
              <div>
                Total Active Fundraisers:{" "}
                {organization.total_active_fundraisers}
              </div>
            </div>
          </div>
        </div>

        <div className="organizationActions" style={{ marginTop:"-83px" }}>
          <Button
            style={{ marginRight: "16px" }}
            onClick={(e) => {
              e.stopPropagation();
              unArchive(organization.id);
            }}
          >
            <span className="edit-button">Un-archive</span>
          </Button>
        </div>
      </CardContent>
    </Card>
    <br />
  </>
  );
  
}

// this allows us to use <App /> in index.js
export default ArchivedOrganizationCard;
