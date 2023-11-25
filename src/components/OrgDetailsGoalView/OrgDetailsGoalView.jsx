import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Style
import { Typography, Card, CardContent } from "@mui/material";
import "./OrgDetailsGoalView.css";
// Component
import AddGroupPopover from "../AddGroupPopover/AddGroupPopover";

export default function OrgDetailsGoalView({ info }) {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({ type: "FETCH_FUNDRAISERS" });
  // }, [dispatch]);
  // Store
  // const fundraiserGoalInfo = useSelector((store) => store.fundraisers);
  console.log("PROPS = ", info);
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
              Goal for Org Here:<strong>&nbsp;$2000</strong>
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
