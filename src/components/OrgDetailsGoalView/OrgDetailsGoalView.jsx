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
          <center>Goal for Org Here</center>
        </div>
      </CardContent>
    </Card>
  );
}
