import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Typography, Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TableTaskDetails from "../TableTaskDetails/TableTaskDetails";
import NewTaskModal from "../NewTaskModal/NewTaskModal";
import AddBoxIcon from "@mui/icons-material/AddBox";
import "./DetailsTaskView.css";
// ~~~~~~~~~~ Utils ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";

export default function DetailsTaskView({ caseType }) {
  const dispatch = dispatchHook();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(caseType);
  const merchantId = useParams();
  console.log(merchantId.id);

  useEffect(() => {
    dispatch({ type: "FETCH_MERCHANT_COMMENTS", payload: merchantId.id });
    dispatch({
      type: "FETCH_MERCHANT_TASKS",
      payload: merchantId.id,
    });
  }, [dispatch, merchantId.id]);
  
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
            <TableTaskDetails />
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
