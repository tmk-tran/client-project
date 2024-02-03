// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// // ~~~~~~~~~~ Style ~~~~~~~~~
// import {
//   Table,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableHead,
//   Typography,
// } from "@mui/material";
// import "./TableTaskDetails.css";
// // ~~~~~~~~~~ Component ~~~~~~~~~
// import CommentDisplay from "../CommentDisplay/CommentDisplay";
// // ~~~~~~~~~~ Hooks ~~~~~~~~~
// import { mTasks, mComments, oTasks } from "../../hooks/reduxStore";
// import { dispatchHook } from "../../hooks/useDispatch";
// import { capitalizeWords, formatDate } from "../Utils/helpers";
// import { dueDateHighlight } from "../Utils/colors";

// export default function TableTaskDetails({ mId, caseType }) {
//   console.log(mId);
//   console.log(caseType);
//   const paramsObject = useParams();
//   const dispatch = dispatchHook();
//   const merchantTasks = mTasks();
//   console.log(merchantTasks);
//   const comments = mComments();
//   console.log(comments);
//   const orgTasks = oTasks();
//   console.log(orgTasks);

//   const fullWidth = {
//     width: "100%",
//   };

//   const boldCenter = {
//     fontWeight: "bold",
//     textAlign: "center",
//   };

//   return (
//     <Table>
//       <TableBody>
//         {merchantTasks.map((task, index) => {
//           // Filter comments for the current task
//           const taskComments = comments.filter(
//             (comment) => comment.task_id === task.id
//           );
//           console.log(taskComments);
//           // Check if there are multiple comments for the task
//           const displaySingleComment = taskComments.length > 0;
//           console.log(displaySingleComment);

//           return (
//             <div key={index} className="task-row-shading">
//               <TableHead>
//                 <TableRow>
//                   <TableCell
//                     colSpan={3}
//                     style={{ ...fullWidth, padding: 0, border: "none" }}
//                   >
//                     <Typography
//                       variant="body1"
//                       sx={{
//                         ...boldCenter,
//                         textDecoration: "underline",
//                       }}
//                     >
//                       #{index + 1}: &nbsp;{capitalizeWords(task.task)}
//                     </Typography>
//                   </TableCell>
//                 </TableRow>

//                 <TableRow>
//                   <TableCell
//                     style={{
//                       ...fullWidth,
//                       border: "none",
//                       padding: 0,
//                     }}
//                   >
//                     <Typography variant="body2" sx={boldCenter}>
//                       Status:
//                       <span style={{ marginLeft: "15px" }}>
//                         {capitalizeWords(task.task_status)}
//                       </span>
//                     </Typography>
//                   </TableCell>

//                   <TableCell
//                     style={{
//                       border: "none",
//                     }}
//                     colSpan={2}
//                   >
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         ...boldCenter,
//                         ...dueDateHighlight,
//                       }}
//                     >
//                       Due:
//                       <span style={{ marginLeft: "15px" }}>
//                         {formatDate(task.due_date)}
//                       </span>
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 <TableRow>
//                   <TableCell colSpan={3} style={fullWidth}>
//                     {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
//                     {/* Map through taskComments for the current task */}
//                     {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
//                     {displaySingleComment && (
//                       <CommentDisplay
//                         key={taskComments[0].id}
//                         comment={taskComments[0]}
//                         showAllComments={false}
//                       />
//                     )}
//                     <hr />
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </div>
//           );
//         })}
//       </TableBody>
//     </Table>
//   );
// }


import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography,
} from "@mui/material";
import "./TableTaskDetails.css";
import CommentDisplay from "../CommentDisplay/CommentDisplay";
import { mTasks, mComments, oTasks } from "../../hooks/reduxStore";
import { dispatchHook } from "../../hooks/useDispatch";
import { capitalizeWords, formatDate } from "../Utils/helpers";
import { dueDateHighlight } from "../Utils/colors";

export default function TableTaskDetails({ mId, caseType }) {
  console.log(mId);
  console.log(caseType);
  const paramsObject = useParams();
  const dispatch = dispatchHook();
  const merchantTasks = mTasks();
  const comments = mComments();
  const orgTasks = oTasks();

  const fullWidth = {
    width: "100%",
  };

  const boldCenter = {
    fontWeight: "bold",
    textAlign: "center",
  };

  useEffect(() => {
    dispatch({ type: "FETCH_MERCHANT_COMMENTS", payload: mId });

    dispatch({
      type: "FETCH_MERCHANT_TASKS",
      payload: mId,
    });
  }, [dispatch, mId]);

  const renderTask = (task, index) => {
    const taskComments = comments.filter(
      (comment) => comment.task_id === task.id
    );
    const displaySingleComment = taskComments.length > 0;

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
              {displaySingleComment && (
                <CommentDisplay
                  key={taskComments[0].id}
                  comment={taskComments[0]}
                  showAllComments={false}
                />
              )}
              <hr />
            </TableCell>
          </TableRow>
        </TableBody>
      </div>
    );
  };

  return (
    <Table>
      <TableBody>
        {caseType === "orgTaskView"
          ? orgTasks.map(renderTask)
          : merchantTasks.map(renderTask)}
      </TableBody>
    </Table>
  );
}
