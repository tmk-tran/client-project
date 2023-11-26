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

  // Total number of goals for groups
  const totalGoals = groups.reduce((total, group) => {
    // Convert the goal to a number if it's not null
    const goal = group.goal ? parseInt(group.goal, 10) : 0;
    return total + goal;
  }, 0);

  return (
    <>
      <Card elevation={3} className="goals-display-card">
        <CardContent>
          <div>
            <AddGroupPopover info={info} />
          </div>
          {/* <Typography variant="h6" sx={{ textAlign: "center", mb: 1 }}>
            Total Goal:
            <strong>
              &nbsp;
              {totalGoals > 0 ? (
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0, // Set this to 2 if you want cents
                }).format(totalGoals)
              ) : (
                <span>No Active Fundraiser</span>
              )}
            </strong>
          </Typography> */}
          <div className="org-detail-goal-container">
            <center>
              {/* <br /> */}
              {fundraiserInfo && fundraiserInfo.length > 0 ? (
                fundraiserInfo.map((fundraiser) => (
                  // <div key={fundraiser.id}>
                  //   <Typography>
                  //     Fundraiser End Date: {formatDate(fundraiser.end_date)}
                  //   </Typography>
                  // </div>
                  <TableGroupDetails
                    key={fundraiser.id}
                    fundraiser={fundraiser}
                    totalGoals={totalGoals}
                    groups={groups}
                  />
                ))
              ) : (
                <div>
                  <Typography>No Fundraisers Available</Typography>
                </div>
              )}
            </center>
          </div>
          {/* <div>
            <AddGroupPopover info={info} />
          </div> */}
        </CardContent>
      </Card>
    </>
  );
}
