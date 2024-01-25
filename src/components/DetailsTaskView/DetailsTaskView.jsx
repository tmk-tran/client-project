// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Typography, Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TableTaskDetails from "../TableTaskDetails/TableTaskDetails";
import NewTaskModal from "../NewTaskModal/NewTaskModal";
import AddBoxIcon from "@mui/icons-material/AddBox";
import "./DetailsTaskView.css";
// ~~~~~~~~~~ Utils ~~~~~~~~~~
import { hrStyle } from "../Utils/helpers";

export default function DetailsTaskView({ caseType }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(caseType);

  return (
    <div className={`details-container ${isSmallScreen ? "small-screen" : ""}`}>
      <Card elevation={3} className="goals-display-card">
        <CardContent>
          <Typography
            variant="h6"
            sx={{ textAlign: "center", mb: 1, fontWeight: "bold" }}
          >
            Tasks
          </Typography>
          <div
            className={`task-display-container ${
              caseType === "merchantView" ? "merchant-task-view" : ""
            }`}
          >
            {/* UPDATE THIS FOR ALT ROW SHADING */}
            <div className="task-row-shading">
              <TableTaskDetails />
            </div>
            <TableTaskDetails />

            <hr style={hrStyle} />
            
          </div>

          <div>
            {caseType === "merchantView" ? (
              // Render NewTaskModal with 'merchantTab' props
              <NewTaskModal
                customIcon={<AddBoxIcon />}
                customText="Task"
                caseType={"merchantView"}
              />
            ) : (
              // Render regular NewTaskModal
              <NewTaskModal customIcon={<AddBoxIcon />} customText="Task" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
