import { Card, CardContent, Typography, Button } from "@mui/material";
import { historyHook } from "../../hooks/useHistory";

export default function TaskCardOrg() {

  const history = historyHook();

  return (
    <Card style={{ width: "100%" }} onClick={() => {console.log("Card click!")}}>
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

              {/* NEED to add an ID here to associate to specific task on next view */}
              <Button variant="contained" onClick={() => history.push(`/orgtaskdetails/${1}`)}>Details</Button>
            </div>

          </div>

          <div className="task-description-section">
            Short description of task, entered during creation
          </div>

          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button onClick={() => {console.log("New")}}>New</Button>
            <Button onClick={() => {console.log("In Progress")}}>In Progress</Button>
            <Button onClick={() => {console.log("Complete")}}>Complete</Button>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
