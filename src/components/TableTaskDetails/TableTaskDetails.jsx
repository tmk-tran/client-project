import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// ~~~~~~~~~~ Style ~~~~~~~~~
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography,
} from "@mui/material";
import "./TableTaskDetails.css";
// ~~~~~~~~~~ Component ~~~~~~~~~
import CommentDisplay from "../CommentDisplay/CommentDisplay";
// ~~~~~~~~~~ Hooks ~~~~~~~~~
import { mTasks } from "../../hooks/reduxStore";
import { dispatchHook } from "../../hooks/useDispatch";

export default function TableTaskDetails() {
  const paramsObject = useParams();
  const dispatch = dispatchHook();
  const merchantTasks = mTasks();
  console.log(merchantTasks);

  useEffect(() => {
    dispatch({
      type: "FETCH_MERCHANT_TASKS",
      payload: paramsObject.id,
    });
  }, []);

  return (
    <Table>
      <TableBody>
      {/* <TableHead>
        <TableRow>
          <TableCell colSpan={2}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                border: "1px solid red",
                // margin: 0,
              }}
            >
              Task #
            </Typography>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Status:
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Status Listed Here
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        <TableRow>
          <TableCell>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Due:
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Due Date Goes Here
            </Typography>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={2}>
            <CommentDisplay />
          </TableCell>
        </TableRow> */}
        {merchantTasks.map((task, index) => (
          // <React.Fragment key={index}>
            <div key={index} className="task-row-shading">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "1px solid red",
                      // margin: 0,
                    }}
                  >
                    Task #{index + 1}
                  </Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Status:
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {task.status}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Due:
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {task.due_date}
                  </Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <CommentDisplay />
                </TableCell>
              </TableRow>
            </TableBody>
          {/* </React.Fragment> */}
          </div>
        ))}
      </TableBody>
    </Table>
  );
}
