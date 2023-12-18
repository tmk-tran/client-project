import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import "./OrgListView.css";
import Swal from "sweetalert2";
import EditOrganizationModal from "../EditOrgModal/EditOrganizationModal";

function OrgListView({ organization }) {
  const history = useHistory();
  const dispatch = useDispatch();
  // const organizationsList = useSelector((store) => store.organizations);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  // sets edit to true to open the modal
  const handleEdit = () => {
    setEditModalOpen(true);
  };

  // closes the edit modal
  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  // renders either the logo or initials of organization depending if a photo is available, same as archived page
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

  // archives the organization- "soft delete"
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
  // history.push to org details page
  function goToDetails() {
    history.push(`/orgDetails/${organization.id}`);
  }
  // formats the money amount to have a comma over $1000
  const totalOrgEarnings = parseFloat(organization.total_org_earnings);
  const formattedEarnings = totalOrgEarnings.toLocaleString();

  // variables for the book amounts to be able to do the quick math here
  const totalCheckedOutBooks = organization.total_checked_out_books;
  const totalCheckedInBooks = organization.total_checked_in_books;
  const totalBooksSold = organization.total_books_sold;
  const totalStandingBooks =
    totalCheckedOutBooks - totalCheckedInBooks - totalBooksSold;

  return (
    <>
      <Card className="organizationListContainer">
        <CardContent>
          <div className="organizationClickable" onClick={goToDetails}>
            <div className="organizationHeader">
              {renderLogoOrInitials()}
              <div className="organizationDetails">
                <Typography variant="h6" sx={{ mt: 0, fontWeight: "bold" }}>
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
            className="organizationActions"
            style={{
              marginTop:
                organization.total_active_fundraisers <= 0 ? "-115px" : "-85px",
            }}
          >
            <Button
              style={{ marginRight: "14px" }}
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(organization.id);
              }}
            >
              <span className="edit-button">Edit</span>
            </Button>
            {organization.total_active_fundraisers <= 0 && (
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
