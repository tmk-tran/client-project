import React from "react";
import { useSelector } from "react-redux";
// Style
import { Typography, Card, CardContent, Paper } from "@mui/material";
import "./OrgDetailsGoalView.css";
// Component
import AddGroupPopover from "../AddGroupPopover/AddGroupPopover";
import TableGroupDetails from "../TableGroupDetails/TableGroupDetails";
// Utils
import { formatDate } from "../Utils/helpers";

export default function OrgDetailsGoalView({ info, groups }) {
  const fundraiserInfo = useSelector((store) => store.fundraisers);
  console.log(fundraiserInfo.length);

  // Total number of goals for groups
  const totalGoals = groups.reduce((total, group) => {
    // Convert the goal to a number if it's not null
    const goal = group.goal ? parseInt(group.goal, 10) : 0;
    return total + goal;
  }, 0);

  const totalReceived = fundraiserInfo.reduce((total, fundraiser) => {
    const moneyIn = fundraiser.money_received
      ? parseInt(fundraiser.money_received, 10)
      : 0;
    return total + moneyIn;
  }, 0);

  const goalData = {
    totalGoals: totalGoals,
    totalReceived: totalReceived,
    groups: fundraiserInfo.reduce(
      (acc, fundraiser) => acc.concat(fundraiser.groups),
      []
    ),
    fundraiserInfo: fundraiserInfo.reduce(
      (acc, fundraiser) => acc.concat(fundraiser),
      []
    ),
  };

  return (
    <>
      <Card elevation={3} className="goals-display-card">
        <CardContent>
          <div>
            <AddGroupPopover info={info} />
          </div>
          <div className="org-detail-goal-container">
            <center>
              {/* <br /> */}
              {fundraiserInfo && fundraiserInfo.length > 0 ? (
                <TableGroupDetails
                  key="goalData" // Set a key to force re-render when data changes
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
        </CardContent>
        {/* <div>
          <AddGroupPopover info={info} />
        </div> */}
      </Card>
    </>
  );
}
