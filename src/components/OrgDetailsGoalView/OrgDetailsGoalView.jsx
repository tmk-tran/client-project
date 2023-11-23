import React from "react";
import { Typography, Card, CardContent } from "@mui/material";
import "./OrgDetailsGoalView.css";

export default function OrgDetailsGoalView() {
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
          <center><Typography variant="h6">Goal for Org Here:<strong>&nbsp;$2000</strong></Typography></center>
        </div>
      </CardContent>
    </Card>
  );
}
