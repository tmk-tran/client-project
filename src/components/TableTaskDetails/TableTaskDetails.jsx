import React from "react";
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
import { mTasks, mComments } from "../../hooks/reduxStore";
import { dispatchHook } from "../../hooks/useDispatch";
import { capitalizeWords, formatDate } from "../Utils/helpers";
import { dueDateHighlight } from "../Utils/colors";

export default function TableTaskDetails() {
  const merchantTasks = mTasks();
  console.log(merchantTasks);
  const comments = mComments();
  console.log(comments);

  const fullWidth = {
    width: "100%",
  };

  const boldCenter = {
    fontWeight: "bold",
    textAlign: "center",
  };

  return (
    <Table>
      <TableBody>
        {merchantTasks.map((task, index) => {
          // Filter comments for the current task
          const taskComments = comments.filter(
            (comment) => comment.task_id === task.id
          );

          return (
            <div key={index} className="task-row-shading">
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={3}
                    style={{ ...fullWidth, padding: 0, border: "none" }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        ...boldCenter,
                        textDecoration: "underline",
                      }}
                    >
                      #{index + 1}: &nbsp;{capitalizeWords(task.task)}
                    </Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    style={{
                      ...fullWidth,
                      border: "none",
                      padding: 0,
                    }}
                  >
                    <Typography variant="body2" sx={boldCenter}>
                      Status:
                      <span style={{ marginLeft: "15px" }}>
                        {capitalizeWords(task.task_status)}
                      </span>
                    </Typography>
                  </TableCell>

                  <TableCell
                    style={{
                      border: "none",
                    }}
                    colSpan={2}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        ...boldCenter,
                        ...dueDateHighlight,
                      }}
                    >
                      Due:
                      <span style={{ marginLeft: "15px" }}>
                        {formatDate(task.due_date)}
                      </span>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} style={fullWidth}>
                    {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                    {/* Map through taskComments for the current task */}
                    {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                    {taskComments.map((comment) => (
                      <CommentDisplay
                        key={comment.id}
                        comment={comment}
                        showAllComments={false}
                      />
                    ))}
                    <hr />
                  </TableCell>
                </TableRow>
              </TableBody>
            </div>
          );
        })}
      </TableBody>
    </Table>
  );
}
