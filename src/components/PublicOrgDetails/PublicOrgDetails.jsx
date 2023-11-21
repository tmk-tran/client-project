import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Style
import { Button, Typography, Card, CardContent } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// Components
import PublicOrgContactDetails from "../PublicOrgContactDetails/PublicOrgContactDetails";
import PublicOrgGroupInfo from "../PublicOrgGroupInfo/PublicOrgGroupInfo";
// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Utils
import { formatDate } from "../Utils/helpers";

export default function PublicOrgDetails() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const paramsObject = useParams();
  const dispatch = useDispatch();

  const detailsOrg = useSelector((store) => store.orgDetailsReducer);
  const groups = useSelector((store) => store.orgGroups);
  const notes = useSelector((store) => store.orgNotes);
  console.log(notes);
  // State
  const [noteAdded, setNoteAdded] = useState(false);
  const [view1, setView1] = useState(false);
  const [view2, setView2] = useState(false);
  const [view3, setView3] = useState(false);

  useEffect(() => {
    dispatch({
      type: "FETCH_ORG_DETAILS",
      payload: paramsObject.id,
    });
    dispatch({
      type: "FETCH_ORGANIZATIONS",
      payload: paramsObject.id,
    });
    // Reset noteAdded after fetching data
    setNoteAdded(false);
  }, [paramsObject.id, groups]);

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
    });
  });

  const handleNoteAdded = () => {
    setNoteAdded(true);
  };

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
                {/* Display organization details once */}
                <center>
                  <PublicOrgContactDetails info={orgDetails} />
                </center>

                {/* Display associated groups or "No groups assigned" message */}
                <div className="OrgGroupInfo-container">
                  {groups && groups.some((group) => group.group_id !== null) ? (
                    groups.map((groupInfo, i) => (
                      <PublicOrgGroupInfo
                        key={groupInfo.group_id}
                        groupInfo={groupInfo}
                        groupNumber={i + 1}
                        view1={view1}
                      />
                    ))
                  ) : (
                    <Typography variant="h6">No Groups Assigned</Typography>
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