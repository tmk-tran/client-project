// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Typography, Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TableTaskDetails from "../TableTaskDetails/TableTaskDetails";

export default function OrgDetailsTaskView() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={`details-container ${isSmallScreen ? "small-screen" : ""}`}>
      <Card className="goals-display-card">
        <CardContent>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              Task Details
            </Typography>
          <div className="org-detail-goal-container">
            <TableTaskDetails />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
