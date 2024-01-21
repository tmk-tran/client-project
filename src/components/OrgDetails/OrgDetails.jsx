// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// // ~~~~~~~~~~ Style ~~~~~~~~~~
// import "./OrgDetails.css";
// import { Typography, Card, CardContent } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
// // ~~~~~~~~~~ Components ~~~~~~~~~~
// import OrgContactDetails from "../OrgContactDetails/OrgContactDetails";
// import OrgGroupInfo from "../OrgGroupInfo/OrgGroupInfo";
// import AddGroupPopover from "../AddGroupPopover/AddGroupPopover";
// import OrgNotesDisplay from "../OrgNotesDisplay/OrgNotesDisplay";
// import OrgNotesModal from "../OrgNotesModal/OrgNotesModal";
// import OrgDetailsGoalView from "../OrgDetailsGoalView/OrgDetailsGoalView";
// // ~~~~~~~~~~ Toast ~~~~~~~~~~
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // ~~~~~~~~~~ Hooks ~~~~~~~~~~
// import { dispatchHook } from "../../hooks/useDispatch";
// import { oDetails, oGroups, oNotes } from "../../hooks/reduxStore";

// export default function orgDetails({ caseType }) {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
//   const paramsObject = useParams();
//   // ~~~~~~~~~~ Hooks ~~~~~~~~~~
//   const dispatch = dispatchHook();
//   const detailsOrg = oDetails();
//   console.log(detailsOrg);
//   const groups = oGroups();
//   console.log(groups);
//   const notes = oNotes();

//   useEffect(() => {
//     dispatch({
//       type: "FETCH_ORG_DETAILS",
//       payload: paramsObject.id,
//     });
//     dispatch({
//       type: "FETCH_ORGANIZATIONS",
//       payload: paramsObject.id,
//     });
//     dispatch({
//       type: "FETCH_ORG_FUNDRAISERS",
//       payload: paramsObject.id,
//     });
//   }, [groups]);

//   // Create a map to store organization details and associated groups
//   const orgMap = new Map();

//   // Populate the map with unique organizations and associated groups
//   detailsOrg.forEach((info) => {
//     const orgId = info.organization_id;

//     if (!orgMap.has(orgId)) {
//       orgMap.set(orgId, { orgDetails: info, groups: [] });
//     }

//     // Add group details to the associated organization
//     orgMap.get(orgId).groups.push({
//       group_id: info.group_id,
//       department: info.department,
//       sub_department: info.sub_department,
//       group_nickname: info.group_nickname,
//       group_photo: info.group_photo,
//       group_description: info.group_description,
//       goal: info.sum,
//     });
//   });

//   return (
//     <div className={`details-container ${isSmallScreen ? "small-screen" : ""}`}>
//       <Card className="details-card" elevation={3}>
//         <CardContent>
//           <div className="detailsOrg-container">
//             {/* Iterate over the unique organizations in the map */}
//             {[...orgMap.values()].map(({ orgDetails, groups }) => (
//               <React.Fragment key={orgDetails.organization_id}>
//                 <OrgNotesDisplay notes={notes} orgDetails={orgDetails} />
//                 {/* Display organization details once */}
//                 <center>
//                   <OrgContactDetails info={orgDetails} />
//                   <br />
//                 </center>

//                 {/* Toast (INACTIVE, MAY USE LATER) */}
//                 {/* <ToastContainer
//                   style={{
//                     top: "45%",
//                     left: "68%",
//                     transform: "translate(-50%, -50%)",
//                   }}
//                 /> */}

//                 {/* Add Buttons */}
//                 <div>
//                   {/* Notes Section */}
//                   {/* <OrgNotesModal
//                     info={orgDetails}
//                   /> */}
//                   {/* Add Groups */}
//                   {/* <AddGroupPopover info={orgDetails} /> */}
//                 </div>

//                 {/* <OrgDetailsGoalView /> */}
//                 {caseType === 1 ? (
//                   <>
//                     <OrgDetailsGoalView
//                       info={orgDetails}
//                       groups={groups}
//                       caseType={1}
//                     />
//                   </>
//                 ) : caseType === 2 ? (
//                   <>
//                     <OrgDetailsGoalView caseType={2} />
//                   </>
//                 ) : null}

//                 {/* Display associated groups or "No groups assigned" message */}
//                 <div className="OrgGroupInfo-container">
//                   {groups && groups.some((group) => group.group_id !== null) ? (
//                     groups.map((groupInfo, i) => (
//                       <OrgGroupInfo
//                         key={groupInfo.group_id}
//                         groupInfo={groupInfo}
//                         groupNumber={i + 1}
//                       />
//                     ))
//                   ) : (
//                     <div style={{ height: "200px" }}>
//                       <Typography variant="h6">No Groups Assigned</Typography>
//                     </div>
//                   )}
//                 </div>
//               </React.Fragment>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

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
import AddGroupPopover from "../AddGroupPopover/AddGroupPopover";
import OrgNotesDisplay from "../OrgNotesDisplay/OrgNotesDisplay";
import OrgNotesModal from "../OrgNotesModal/OrgNotesModal";
import OrgDetailsGoalView from "../OrgDetailsGoalView/OrgDetailsGoalView";
// ~~~~~~~~~~ Toast ~~~~~~~~~~
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";
import { oDetails, oGroups, oNotes } from "../../hooks/reduxStore";
import OrgDetailsTaskView from "../OrgDetailsTaskView/OrgDetailsTaskView";

export default function OrgDetails({ caseType }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const paramsObject = useParams();
  const location = useLocation(); // Use location to get the current route

  // Check if the user is on the task page
  const isTaskPage = location.pathname.includes("/orgtaskdetails"); // Adjust the path accordingly

  // ~~~~~~~~~~ Hooks ~~~~~~~~~~
  const dispatch = dispatchHook();
  const detailsOrg = oDetails();
  console.log(detailsOrg);
  const groups = oGroups();
  console.log(groups);
  const notes = oNotes();

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
                <OrgNotesDisplay notes={notes} orgDetails={orgDetails} />
                <center>
                  <OrgContactDetails info={orgDetails} />
                  <br />
                </center>

                <div>
                  {/* Additional buttons or components */}
                  {/* <OrgNotesModal info={orgDetails} /> */}
                  {/* <AddGroupPopover info={orgDetails} /> */}
                </div>

                {!isTaskPage && (
                  // Default content when not on the task page
                  <>
                    <OrgDetailsGoalView info={orgDetails} groups={groups} />

                    <div className="OrgGroupInfo-container">
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
                    {/* <Typography variant="h6">Task Page View</Typography> */}
                    {/* Add task-related content here */}
                    <OrgDetailsTaskView />

                    <div className="OrgDetailsCard-container">
                      <Card>
                        <CardContent>Coupon Card Here</CardContent>
                      </Card>
                    </div>
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
