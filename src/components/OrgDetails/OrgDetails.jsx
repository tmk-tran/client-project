import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Style
import "./OrgDetails.css";
import { Button, Typography, Card, CardContent } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// Components
import OrgContactDetails from "../OrgContactDetails/OrgContactDetails";
import OrgGroupInfo from "../OrgGroupInfo/OrgGroupInfo";
import OrgGroupTabs from "../OrgGroupTabs/OrgGroupTabs";
import AddGroupPopover from "../AddGroupPopover/AddGroupPopover";

export default function orgDetails() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const paramsObject = useParams();
  const dispatch = useDispatch();

  const detailsOrg = useSelector((store) => store.orgDetailsReducer);
  // console.log("DETAILS = ", detailsOrg);
  const orgList = useSelector((store) => store.organizations);
  // console.log("ORGANIZATIONS = ", orgList);
  const groups = useSelector((store) => store.orgGroups);
  // State
  const [tabView, setTabView] = useState(false);
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

  return (
    <div
      className={`OrgDetails-container ${isSmallScreen ? "small-screen" : ""}`}
    >
      <Card className="OrgDetails-card" elevation={3}>
        <CardContent>
          {/* <center>
            <div className="org-details-header"> */}
          {/* <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Organization Details
              </Typography> */}
          {/* </div>
          </center> */}
          <div className="detailsOrg-container">
            {/* Iterate over the unique organizations in the map */}
            {[...orgMap.values()].map(({ orgDetails, groups }) => (
              <React.Fragment key={orgDetails.organization_id}>
                {/* Display organization details once */}
                <center>
                  <OrgContactDetails info={orgDetails} />
                </center>
                {/* buttons for views demo */}
                <div style={{ width: "10%" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <button
                      onClick={() => {
                        setTabView(!tabView);
                      }}
                    >
                      Tab View
                    </button>
                    <br />
                    <button onClick={() => setView1(!view1)}>
                      {view1 ? "View Off" : "Left"}
                    </button>
                    <button onClick={() => setView2(!view2)}>
                      {view2 ? "View Off" : "Center"}
                    </button>
                    <button onClick={() => setView3(!view3)}>
                      {view3 ? "Table" : "View Off"}
                    </button>
                  </div>
                </div>

                {/* end buttons for demo */}

                <div className="add-group-btn">
                  <AddGroupPopover info={orgDetails} />
                </div>

                {/* Display associated groups or "No groups assigned" message */}
                <div className="OrgGroupInfo-container">
                  {groups && groups.some((group) => group.group_id !== null) ? (
                    tabView ? (
                      // If tabView is true, render OrgGroupTabs
                      <OrgGroupTabs
                        groups={groups}
                        view1={view1}
                        view2={view2}
                        view3={view3}
                      />
                    ) : (
                      // If tabView is false, render OrgGroupInfo
                      groups.map((groupInfo, i) => (
                        <OrgGroupInfo
                          key={groupInfo.group_id}
                          groupInfo={groupInfo}
                          groupNumber={i + 1}
                          view1={view1}
                          view2={view2}
                          view3={view3}
                        />
                      ))
                    )
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
