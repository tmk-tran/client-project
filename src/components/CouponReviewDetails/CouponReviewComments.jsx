import React, { useState, useEffect } from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~
import { Typography, TextField } from "@mui/material";
import { border, primaryColor } from "../Utils/colors";
// ~~~~~~~~~~ Component ~~~~~~~~~
import CommentDisplay from "../CommentDisplay/CommentDisplay";
import CommentInput from "./CommentInput";
import "./CouponReviewDetails.css";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { mComments } from "../../hooks/reduxStore";
import { dispatchHook } from "../../hooks/useDispatch";

export default function CouponReviewComments({ merchantId }) {
  const dispatch = dispatchHook();

  const [taskId, setTaskId] = useState(null);
  // const [commentAdded, setCommentAdded] = useState(false);
  // console.log(commentAdded);
  console.log(taskId);
  console.log(merchantId);
  const merchantComments = mComments() || [];
  console.log(merchantComments);

  // useEffect to handle the extraction when merchantComments changes
  useEffect(() => {
    const taskIds = [
      ...new Set(merchantComments.map((comment) => comment.task_id)),
    ];

    // Check if the array is not empty and the first element is not null
    if (taskIds.length > 0 && taskIds[0] !== null) {
      const extractedTaskId = taskIds[0];
      setTaskId(extractedTaskId); // Set the taskId state variable
    } else {
      console.log("No valid task ID found");
    }

    // dispatch({ type: "FETCH_MERCHANT_COMMENTS", payload: merchantId });

  }, [merchantComments]);

  return (
    <div
      style={{
        width: "50%",
        position: "relative",
        border: `1px solid ${primaryColor.color}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", textAlign: "center", mb: 1 }}
      >
        Comments
      </Typography>

      {merchantComments.map((comment) => (
        <div className="comment-display-row">
          <CommentDisplay
            backgroundColor=""
            comment={comment}
            showAllComments={true}
          />
        </div>
      ))}

      <div style={{ width: "100%", marginTop: "auto" }}>
        <CommentInput merchantId={merchantId} taskId={taskId} />
      </div>
    </div>
  );
}
