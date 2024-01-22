import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import "./OrgDetails.css";
import { Typography, Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import OrgContactDetails from "../OrgContactDetails/OrgContactDetails";
import OrgGroupInfo from "../OrgGroupInfo/OrgGroupInfo";
import OrgNotesDisplay from "../OrgNotesDisplay/OrgNotesDisplay";
import OrgDetailsGoalView from "../OrgDetailsGoalView/OrgDetailsGoalView";
import DetailsTaskView from "../DetailsTaskView/DetailsTaskView";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";
import { oDetails, oGroups, oNotes, mNotes } from "../../hooks/reduxStore";

// ~~~~~~~~~~ May Use Later ~~~~~~~~~~
import AddGroupPopover from "../AddGroupPopover/AddGroupPopover";
import OrgNotesModal from "../OrgNotesModal/OrgNotesModal";
// ~~~~~~~~~~ Toast ~~~~~~~~~~
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export default function OrgDetails() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const paramsObject = useParams();
  const location = useLocation(); // Use location to get the current route

  // Check if the user is on the task page
  const isDetailsPage = location.pathname.includes("/orgDetails"); // Adjust the path accordingly
  const isTaskPage = location.pathname.includes("/orgtaskdetails");
  const isMerchantTaskPage = location.pathname.includes("/merchantTaskDetails");

  // ~~~~~~~~~~ Hooks ~~~~~~~~~~
  const dispatch = dispatchHook();
  const detailsOrg = oDetails();
  console.log(detailsOrg);
  const groups = oGroups();
  console.log(groups);
  const notes = oNotes();
  // const notesM = mNotes();

  useEffect(() => {
    dispatch({
      type: "FETCH_ORG_DETAILS",
      payload: paramsObject.id,
    });
    dispatch({
      type: "FETCH_ORGANIZATIONS",
      payload: paramsObject.id,
    });
    dispatch({
      type: "FETCH_ORG_FUNDRAISERS",
      payload: paramsObject.id,
    });
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
    <div className={`details-container ${isSmallScreen ? "small-screen" : ""}`}>
      <Card className="details-card" elevation={3}>
        <CardContent>
          <div className="detailsOrg-container">
            {[...orgMap.values()].map(({ orgDetails, groups }) => (
              <React.Fragment key={orgDetails.organization_id}>

                {!isTaskPage ? (
                  <OrgNotesDisplay notes={notes} orgDetails={orgDetails} />
                ) : (
                  <OrgNotesDisplay
                    notes={notes}
                    orgDetails={orgDetails}
                    caseType={1}
                  />
                )}

                {/* {isMerchantTaskPage && (
                  <OrgNotesDisplay notes={notes} merchantDetails={merchantDetails} />
                )} */}
                {isMerchantTaskPage && (
                  <OrgNotesDisplay notes={notes} orgDetails={orgDetails} />
                )}

                <center>
                  <OrgContactDetails info={orgDetails} />
                  <br />
                </center>

                {/* May use later, disabled for now */}
                {/* <div>
                  <OrgNotesModal info={orgDetails} />
                  <AddGroupPopover info={orgDetails} />
                </div> */}

                {!isTaskPage && (
                  // Default content when not on the task page
                  <>
                    <OrgDetailsGoalView info={orgDetails} groups={groups} />

                    <div className="OrgDetailsCard-container">
                      {groups &&
                      groups.some((group) => group.group_id !== null) ? (
                        groups.map((groupInfo, i) => (
                          <OrgGroupInfo
                            key={groupInfo.group_id}
                            groupInfo={groupInfo}
                            groupNumber={i + 1}
                          />
                        ))
                      ) : (
                        <div style={{ height: "200px" }}>
                          <Typography variant="h6">
                            No Groups Assigned
                          </Typography>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {isTaskPage && (
                  // Show task-related content on the task page
                  <>
                    <DetailsTaskView />

                    <div style={{ height: "40vh" }}></div>
                  </>
                )}

                {isMerchantTaskPage && (
                  <>
                    <DetailsTaskView />
                  </>
                )}

              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
