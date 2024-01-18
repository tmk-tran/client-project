import { Card, CardContent, Typography } from "@mui/material";

export default function TaskCard() {
  return (
    <Card style={{ width: "100%" }}>
      <CardContent>
        <div className="list-details-card">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="org-name-section">
              <Typography sx={{ fontWeight: "bold" }}>
                Organization Name
              </Typography>
            </div>
            <div
              className="recent-comment-section"
              style={{ border: "1px solid red" }}
            >
              Most recent comment here
            </div>
          </div>
          <div
            className="task-description-section"
            style={{ border: "1px solid red" }}
          >
            Short description of task, entered during creation
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
