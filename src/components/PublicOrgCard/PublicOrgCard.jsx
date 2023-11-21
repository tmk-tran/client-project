import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Card, CardContent } from "@mui/material";
import './PublicOrdCard.css'

function PublicOrgCard({ organization }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [isHovered, setIsHovered] = useState(false);
  // const organizationsList = useSelector((store) => store.organizations);
  function goToDetails() {
    history.push(`/orgDetails/${organization.id}`);
  }

  const renderLogoOrInitials = () => {
    if (organization.organization_logo) {
      return (
        <img
          className="publicLogoImage"
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


  function goToDetails() {
    history.push(`/publicOrgDetails/${organization.id}`);
  }
const earnings = organization.total_books_sold * organization.organization_earnings;
const formattedEarnings = earnings.toLocaleString();

  return (
    <>
      <Card className="publicOrganizationListContainer">
        <CardContent>
          <div className="publicOrganizationClickable" onClick={goToDetails}>
            <div className="publicOrganizationHeader">
              {renderLogoOrInitials()}
              <div className="publicOrganizationDetails">
                <h2 style={{marginTop: "0px"}}className="publicMedia-header">
                  {organization.organization_name}
                </h2>
                <div>Total Groups: {organization.total_groups}</div>
                <div>
                  Total Books Sold:{" "}
                  {organization.total_books_sold}
                </div>
                <div>
                  Total Raised:{" "}
                  ${formattedEarnings}
                </div>
              </div>
            </div>
          </div>
          <div className="organizationActions" style={{ marginTop: "-90px" }}>
            <Button
              style={{ marginRight: "14px" }}
              onClick={(e) => {
                e.stopPropagation();
                goToDetails();
              }}
            >
              <span className="edit-button">See Groups</span>
            </Button>
            </div>
        </CardContent>
      </Card>
      <br />
    </>
  );
}

export default PublicOrgCard;
