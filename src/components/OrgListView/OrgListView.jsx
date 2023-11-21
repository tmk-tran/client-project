import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Card, CardContent } from "@mui/material";
import "./OrgListView.css";
import Swal from "sweetalert2";
import EditOrganizationModal from "../EditOrgModal/EditOrganizationModal";

function OrgListView({ organization }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [isHovered, setIsHovered] = useState(false);
  // const organizationsList = useSelector((store) => store.organizations);

  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

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
        Swal.fire("Organization Successfully Archived!");
      }
    });
  };

  function goToDetails() {
    history.push(`/orgDetails/${organization.id}`);
  }
  const earnings = organization.total_books_sold * organization.organization_earnings;
const formattedEarnings = earnings.toLocaleString();

const outstandingBalance = parseFloat(organization.total_outstanding_balance);
const formattedOutstandingBalance = isNaN(outstandingBalance) ? "N/A" : outstandingBalance.toLocaleString();

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
                  Total Books Sold:{" "}
                  {organization.total_books_sold}
                </div>
                <div>
                  Outstanding Balance:{" "}
                  ${formattedOutstandingBalance}
                </div>
                <div>
                  Organization Earnings:{" "}
                  ${formattedEarnings}
                </div>
              </div>
            </div>
          </div>

          <div className="organizationActions" style={{ marginTop: organization.total_active_fundraisers <= 1 ? "-128px" : "-95px" }}>
            <Button
              style={{ marginRight: "14px" }}
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(organization.id);
              }}
            >
              <span className="edit-button">Edit</span>
            </Button>
            {organization.total_active_fundraisers <= 1 && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleArchive(organization.id);
                }}
              >
                Archive
              </Button>
            )}
          </div>
        </CardContent>

        <EditOrganizationModal
          open={isEditModalOpen}
          handleClose={handleEditClose}
          organization={organization}
        />
      </Card>
      <br />
    </>
  );
}

export default OrgListView;
