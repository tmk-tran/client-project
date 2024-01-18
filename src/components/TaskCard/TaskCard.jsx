import {
  Card,
  CardContent,
  Select,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";

export default function TaskCard({ newTask }) {
  // console.log(newTask);
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

          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button>New</Button>
            <Button>In Progress</Button>
            <Button>Complete</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
