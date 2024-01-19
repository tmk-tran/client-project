import { Card, CardContent, Typography, Button } from "@mui/material";

export default function TaskCardOrg({ newTask }) {
  // console.log(newTask);
  return (
    <Card style={{ width: "100%" }}>
      <CardContent>
        <div>
          
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ border: "1px solid red" }}>
              <div className="name-section">
                <Typography sx={{ fontWeight: "bold" }}>
                  Organization Name
                </Typography>
              </div>
            </div>

            <div style={{ border: "1px solid red" }}>
              <div>Most Recent Comment Here</div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <Button variant="contained">Details</Button>
            </div>
          </div>

          <div className="task-description-section">
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
