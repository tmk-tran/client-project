import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Style
import "./OrgDetails.css";
import { Typography, Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// Components
import OrgContactDetails from "../OrgContactDetails/OrgContactDetails";
import OrgGroupInfo from "../OrgGroupInfo/OrgGroupInfo";
import AddGroupPopover from "../AddGroupPopover/AddGroupPopover";
import OrgNotesDisplay from "../OrgNotesDisplay/OrgNotesDisplay";
import OrgNotesModal from "../OrgNotesModal/OrgNotesModal";
import OrgDetailsGoalView from "../OrgDetailsGoalView/OrgDetailsGoalView";
// Sweet Alert
import Swal from "sweetalert2";
// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Icons

export default function orgDetails() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const paramsObject = useParams();
  const dispatch = useDispatch();
  // Store
  const detailsOrg = useSelector((store) => store.orgDetailsReducer);
  const groups = useSelector((store) => store.orgGroups);
  const notes = useSelector((store) => store.orgNotes);
  // State

  useEffect(() => {
    dispatch({
      type: "FETCH_ORG_DETAILS",
      payload: paramsObject.id,
    });
    dispatch({
      type: "FETCH_ORGANIZATIONS",
      payload: paramsObject.id,
    });
    // dispatch({
    //   type: "FETCH_ORG_NOTES",
    //   payload: paramsObject.id,
    // });
  }, [groups]);

  // Create a map to store organization details and associated groups
  const orgMap = new Map();

  // Populate the map with unique organizations and associated groups
  detailsOrg.forEach((info) => {
    const orgId = info.organization_id;

    if (!orgMap.has(orgId)) {
      orgMap.set(orgId, { orgDetails: info, groups: [] });
    }

    // Add group details to the associated organization
    orgMap.get(orgId).groups.push({
      group_id: info.group_id,
      department: info.department,
      sub_department: info.sub_department,
      group_nickname: info.group_nickname,
      group_photo: info.group_photo,
      group_description: info.group_description,
      goal: info.sum,
    });
  });

  return (
    <div
      className={`OrgDetails-container ${isSmallScreen ? "small-screen" : ""}`}
    >
      <Card className="OrgDetails-card" elevation={3}>
        <CardContent>
          <div className="detailsOrg-container">
            {/* Iterate over the unique organizations in the map */}
            {[...orgMap.values()].map(({ orgDetails, groups }) => (
              <React.Fragment key={orgDetails.organization_id}>
                <OrgNotesDisplay notes={notes} orgDetails={orgDetails} />
                {/* Display organization details once */}
                <center>
                  <OrgContactDetails info={orgDetails} />
                </center>

                {/* Toast (INACTIVE, MAY USE LATER) */}
                {/* <ToastContainer
                  style={{
                    top: "45%",
                    left: "68%",
                    transform: "translate(-50%, -50%)",
                  }}
                /> */}

                {/* Add Buttons */}
                <div>
                  {/* Notes Section */}
                  {/* <OrgNotesModal
                    info={orgDetails}
                  /> */}
                  {/* Add Groups */}
                  <AddGroupPopover info={orgDetails} />
                </div>

                <OrgDetailsGoalView />

                {/* Display associated groups or "No groups assigned" message */}
                <div className="OrgGroupInfo-container">
                  {groups && groups.some((group) => group.group_id !== null) ? (
                    groups.map((groupInfo, i) => (
                      <OrgGroupInfo
                        key={groupInfo.group_id}
                        groupInfo={groupInfo}
                        groupNumber={i + 1}
                      />
                    ))
                  ) : (
                    <div style={{ height: "200px" }}>
                      <Typography variant="h6">No Groups Assigned</Typography>
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
