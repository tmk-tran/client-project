import React from "react";
import { useSelector } from "react-redux";
// Style
import { Typography, Card, CardContent } from "@mui/material";
import "./OrgDetailsGoalView.css";
// Component
import AddGroupPopover from "../AddGroupPopover/AddGroupPopover";

export default function OrgDetailsGoalView({ info, groups }) {

  console.log("PROPS = ", info);
  console.log("GOAL = ", groups);
  const endDates = groups.map((group) => group.end_date);
  console.log("END DATES = ", endDates);

  // Total number of goals for groups
  const totalGoals = groups.reduce((total, group) => {
    // Convert the goal to a number if it's not null
    const goal = group.goal ? parseInt(group.goal, 10) : 0;
    return total + goal;
  }, 0);

  return (
    <Card elevation={3} className="goals-display-card">
      <CardContent>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", mb: 1, fontWeight: "bold" }}
        >
          Goal for Org
        </Typography>
        <div className="org-detail-goal-container">
          <center>
            <Typography variant="h6">
              Total Goal:
              <strong>
                &nbsp;
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0, // Set this to 2 if you want cents
                }).format(totalGoals)}
              </strong>
            </Typography>
          </center>
        </div>
        <div>
          <AddGroupPopover info={info} />
        </div>
      </CardContent>
    </Card>
  );
}
