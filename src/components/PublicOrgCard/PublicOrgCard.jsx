import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import "./PublicOrdCard.css";

function PublicOrgCard({ organization }) {
  const history = useHistory();

  function goToDetails() {
    history.push(`/publicOrgDetails/${organization.id}`);
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
  const earnings =
    organization.total_books_sold * organization.organization_earnings;
  const formattedEarnings = earnings.toLocaleString();

  return (
    <>
      <Card className="publicOrganizationListContainer">
        <CardContent>
          <div className="publicOrganizationClickable" onClick={goToDetails}>
            <div className="publicOrganizationHeader">
              {renderLogoOrInitials()}
              <div className="publicOrganizationDetails">
                <Typography
                  variant="h6"
                  style={{ marginTop: "0px" }}
                  className="publicMedia-header"
                >
                  {organization.organization_name}
                </Typography>
                <Typography variant="body2">
                  Total Groups: {organization.total_groups}
                </Typography>
                <Typography variant="body2">
                  Total Books Sold: {organization.total_books_sold}
                </Typography>
                <Typography variant="body2">
                  Organization Earnings: ${formattedEarnings}
                </Typography>
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
