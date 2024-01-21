// import React from "react";
// // ~~~~~~~~~~ Style ~~~~~~~~~~
// import { Typography, Card, CardContent } from "@mui/material";
// import "./OrgDetailsGoalView.css";
// // ~~~~~~~~~~ Component ~~~~~~~~~~
// import AddGroupPopover from "../AddGroupPopover/AddGroupPopover";
// import TableGroupDetails from "../TableGroupDetails/TableGroupDetails";
// // ~~~~~~~~~~ Hooks ~~~~~~~~~~
// import { oFundraisers } from "../../hooks/reduxStore";

// export default function OrgDetailsGoalView({ caseType, info, groups }) {
//   const fundraiserInfo = oFundraisers();
//   console.log(fundraiserInfo);

//   // Total number of goals for groups
//   const totalGoals = groups.reduce((total, group) => {
//     // Convert the goal to a number if it's not null
//     const goal = group.goal ? parseInt(group.goal, 10) : 0;
//     return total + goal;
//   }, 0);

//   // Money received
//   const totalReceived = fundraiserInfo.reduce((total, fundraiser) => {
//     const moneyIn = fundraiser.money_received
//       ? parseInt(fundraiser.money_received, 10)
//       : 0;
//     return total + moneyIn;
//   }, 0);

//   // To prevent rendering multiple times
//   const goalData = {
//     totalGoals: totalGoals,
//     totalReceived: totalReceived,
//     groups: fundraiserInfo.reduce(
//       (acc, fundraiser) => acc.concat(fundraiser.groups),
//       []
//     ),
//     fundraiserInfo: fundraiserInfo.reduce(
//       (acc, fundraiser) => acc.concat(fundraiser),
//       []
//     ),
//   };

//   return (
// <>
//       <Card elevation={3} className="goals-display-card">
//         <CardContent>
//           {caseType === 1 ? (
//             <>
//               <Typography
//                 variant="h6"
//                 sx={{ textAlign: "center", fontWeight: "bold" }}
//               >
//                 Details
//               </Typography>
//               <div
//                 className={`org-detail-goal-container ${
//                   fundraiserInfo && fundraiserInfo.length > 0
//                     ? ""
//                     : "no-fundraisers-bg"
//                 }`}
//               >
//                 {/* <div>
//                   <AddGroupPopover info={info} />
//                 </div> */}
//                 <center>
//                   {/* <br /> */}
//                   {fundraiserInfo && fundraiserInfo.length > 0 ? (
//                     <TableGroupDetails
//                       key="goalData" // Set a key to force re-render when data changes
//                       totalGoals={goalData.totalGoals}
//                       totalReceived={goalData.totalReceived}
//                       groups={goalData.groups}
//                       fundraiserInfo={goalData.fundraiserInfo}
//                     />
//                   ) : (
//                     <div className="no-fundraisers-container">
//                       <Typography variant="h6">No Fundraisers Available</Typography>
//                     </div>
//                   )}
//                 </center>
//               </div>
//               <div>
//                 <AddGroupPopover info={info} />
//               </div>
//             </>
//           ) : caseType === 2 ? (
//             <>
//               <Typography
//                 variant="h6"
//                 sx={{ textAlign: "center", fontWeight: "bold" }}
//               >
//                 Details 2
//               </Typography>
//               {/* Add content specific to caseType 2 */}
//             </>
//           ) : null}
//         </CardContent>
//       </Card>
//     </>
//   );
// }


import React from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Typography, Card, CardContent } from "@mui/material";
import "./OrgDetailsGoalView.css";
// ~~~~~~~~~~ Component ~~~~~~~~~~
import AddGroupPopover from "../AddGroupPopover/AddGroupPopover";
import TableGroupDetails from "../TableGroupDetails/TableGroupDetails";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { oFundraisers } from "../../hooks/reduxStore";

export default function OrgDetailsGoalView({ caseType, info, groups }) {
  const fundraiserInfo = oFundraisers();
  console.log(fundraiserInfo);

  // To prevent rendering multiple times
  const goalData = {
    totalGoals: 0,
    totalReceived: 0,
    groups: [],
    fundraiserInfo: [],
  };

  // Check if groups is defined and is an array before using reduce
  if (Array.isArray(groups)) {
    // Total number of goals for groups
    goalData.totalGoals = groups.reduce((total, group) => {
      // Convert the goal to a number if it's not null
      const goal = group.goal ? parseInt(group.goal, 10) : 0;
      return total + goal;
    }, 0);
  }

  // Check if fundraiserInfo is defined and is an array before using reduce
  if (Array.isArray(fundraiserInfo)) {
    // Money received
    goalData.totalReceived = fundraiserInfo.reduce((total, fundraiser) => {
      const moneyIn = fundraiser.money_received
        ? parseInt(fundraiser.money_received, 10)
        : 0;
      return total + moneyIn;
    }, 0);

    // Concatenate groups and fundraiserInfo arrays
    goalData.groups = fundraiserInfo.reduce(
      (acc, fundraiser) => acc.concat(fundraiser.groups),
      []
    );
    goalData.fundraiserInfo = fundraiserInfo.reduce(
      (acc, fundraiser) => acc.concat(fundraiser),
      []
    );
  }

  return (
    <>
      <Card elevation={3} className="goals-display-card">
        <CardContent>
          {caseType === 1 ? (
            <>
              <Typography
                variant="h6"
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                Details
              </Typography>
              <div
                className={`org-detail-goal-container ${
                  fundraiserInfo && fundraiserInfo.length > 0
                    ? ""
                    : "no-fundraisers-bg"
                }`}
              >
                <center>
                  {fundraiserInfo && fundraiserInfo.length > 0 ? (
                    <TableGroupDetails
                      key="goalData"
                      totalGoals={goalData.totalGoals}
                      totalReceived={goalData.totalReceived}
                      groups={goalData.groups}
                      fundraiserInfo={goalData.fundraiserInfo}
                    />
                  ) : (
                    <div className="no-fundraisers-container">
                      <Typography variant="h6">No Fundraisers Available</Typography>
                    </div>
                  )}
                </center>
              </div>
              <div>
                <AddGroupPopover info={info} />
              </div>
            </>
          ) : caseType === 2 ? (
            <>
              <Typography
                variant="h6"
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                Details 2
              </Typography>
              {/* Add content specific to caseType 2 */}
            </>
          ) : null}
        </CardContent>
      </Card>
    </>
  );
}
