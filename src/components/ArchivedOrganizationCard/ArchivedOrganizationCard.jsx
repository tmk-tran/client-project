import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";
import Swal from "sweetalert2";
import "./ArchivedOrganizationCard.css";

function ArchivedOrganizationCard({ organization }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const auth = useSelectore((store) => store.auth)

  // function to re activate organization and dispatch the data
  // sweet alert to confirm
  function unArchive(organizationId) {
    const resetOrg = {  
      id: organizationId,
      organization_name: organization.organization_name,
      type: organization.type,
      address: organization.address,
      city: organization.city,
      state: organization.state,
      zip: organization.zip,
      primary_contact_first_name: organization.primary_contact_first_name,
      primary_contact_last_name: organization.primary_contact_last_name,
      primary_contact_phone: organization.primary_contact_phone,
      primary_contact_email: contactEmail,
      organization_logo: logoUrl,
      organization_earnings: orgEarnings,
      is_delete: false};
    Swal.fire({
      title: "Are you sure you want to Un-Archive this Organization?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Un-Archive It",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "RESET_ORGANIZATION", payload: {resetOrg: resetOrg, auth:auth } });
        dispatch({ type: "FETCH_ORGANIZATIONS", payload: auth });
        dispatch({ type: "FETCH_ARCHIVED_ORGANIZATIONS", payload: auth });
        Swal.fire("Organization Successfully Un-Archived!");
      }
    });
  }
  // if no picture this function will render intials of the organization
  const renderLogoOrInitials = () => {
    if (organization.organization_logo) {
      return (
        <img
          className="archivedLogoImage"
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

  // formatting some of the data to render on the card
  const totalOrgEarnings = parseFloat(organization.total_org_earnings);
  const formattedEarnings = totalOrgEarnings.toLocaleString();
  const totalCheckedOutBooks = organization.total_checked_out_books;
  const totalCheckedInBooks = organization.total_checked_in_books;
  const totalBooksSold = organization.total_books_sold;
  const totalStandingBooks =
    totalCheckedOutBooks - totalCheckedInBooks - totalBooksSold;

  return (
    <>
      <Card className="archivedOrganizationListContainer">
        <CardContent>
          <div className="archivedOrganizationClickable">
            <div className="archivedOrganizationHeader">
              {renderLogoOrInitials()}
              <div className="archivedOrganizationDetails">
                <Typography
                  className="media-header"
                  variant="h6"
                  sx={{ mt: 0, fontWeight: "bold" }}
                >
                  {organization.organization_name}
                </Typography>
                <div className="detailsContainer">
                  <div className="column">
                    <Typography variant="body2">
                      Organization Fee: ${organization.organization_earnings}
                    </Typography>
                    <Typography variant="body2">
                      Total Books Sold: {organization.total_books_sold}
                    </Typography>
                    <Typography variant="body2">
                      Organization Earnings: ${formattedEarnings}
                    </Typography>
                  </div>
                  <div className="column">
                    <Typography variant="body2">
                      Total Groups: {organization.total_groups}
                    </Typography>
                    <Typography variant="body2">
                      Total Outstanding Books: {totalStandingBooks}
                    </Typography>
                    <Typography variant="body2">
                      PSG Earnings: $
                      {(
                        organization.total_books_sold * 25 -
                        organization.total_org_earnings
                      ).toLocaleString()}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="archivedOrganizationActions"
            style={{ marginTop: "-85px" }}
          >
            <Button
              style={{ marginRight: "16px" }}
              onClick={(e) => {
                e.stopPropagation();
                unArchive(organization.id);
              }}
            >
              <span className="archive-button">Un-archive</span>
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
