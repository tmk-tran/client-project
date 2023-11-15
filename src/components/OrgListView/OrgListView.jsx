import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
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

  return (
    <>
   <div className="organizationListContainer">
  <div className="organizationClickable" onClick={goToDetails}>
    <div className="organizationHeader">
      {renderLogoOrInitials()}
      <div className="organizationDetails">
        <h2 className="media-header" style={{ fontSize: "26px", marginBottom: "0", marginTop: 0 }}>
          {organization.organization_name}
        </h2>
        <div style={{ fontSize: "18px" }}>
          Total Groups: {organization.total_groups}
        </div>
        <div style={{ fontSize: "18px" }}>
          Total Active Fundraisers: {organization.total_active_fundraisers}
        </div>
      </div>
    </div>
  </div>

  <div className="organizationActions">
    <Button
      style={{ marginRight: "15px" }}
      onClick={(e) => {
        e.stopPropagation();
        handleEdit(organization.id);
      }}
    >
      Edit
    </Button>
    <Button
      onClick={(e) => {
        e.stopPropagation();
        handleArchive(organization.id);
      }}
    >
      Archive
    </Button>
  </div>

  <EditOrganizationModal
    open={isEditModalOpen}
    handleClose={handleEditClose}
    organization={organization}
  />
</div>
      <br />
    </>
  );
}

export default OrgListView;
