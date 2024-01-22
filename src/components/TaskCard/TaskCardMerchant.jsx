// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Card, CardContent, Typography, Button } from "@mui/material";
import "./TaskCard.css";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { historyHook } from "../../hooks/useHistory";

export default function TaskCardMerchant() {
  const history = historyHook();

  return (
    <Card style={{ width: "100%" }}>
      <CardContent>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ border: "1px solid red" }}>
              <div className="name-section">
                <Typography sx={{ fontWeight: "bold" }}>
                  Merchant Name
                </Typography>
                <div>Coupon Number</div>
              </div>
            </div>

            <div style={{ border: "1px solid red" }}>
              <div>Status of Development</div>
              <div className="task-description-section">
                Short description of task, entered during creation
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                onClick={() => {
                  history.push(`/merchantTaskDetails/${1}`);
                }}
              >
                Details
              </Button>
            </div>
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
