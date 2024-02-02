import React, { useState, useEffect } from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { TextField, Button, IconButton, Paper } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";
import { User } from "../../hooks/reduxStore";

export default function CommentInput({ merchantId, taskId, onSubmit }) {
  console.log(merchantId);
  console.log(taskId);
  const [comment, setComment] = useState("");
  const [commentAdded, setCommentAdded] = useState(false);
  console.log(commentAdded);
  console.log(comment);
  const user = User() || [];
  console.log(user.username);
  const currentUsername = user.username;
  console.log(currentUsername);

  const dispatch = dispatchHook();

  // useEffect(() => {
  //   dispatch({ type: "FETCH_MERCHANT_COMMENTS", payload: merchantId });
  // }, [dispatch, commentAdded]);

  const newComment = {
    merchant_id: merchantId,
    comment_content: comment,
    user: currentUsername,
    task_id: taskId,
  };

  const handleSubmit = () => {
    // Handle comment submission logic
    console.log("Comment submitted:", newComment);
    dispatch({ type: "ADD_MERCHANT_COMMENT", payload: newComment });
    setCommentAdded(true);
    setComment("");
    onSubmit();
  };

  const handleFileUpload = () => {
    // Handle file upload logic
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        height: "fit-content",
      }}
    >
      <TextField
        label="Type your comment..."
        multiline
        maxRows={4}
        variant="outlined"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ marginBottom: "10px" }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton color="primary" onClick={handleFileUpload}>
          <AttachFileIcon />
        </IconButton>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Paper>
  );
}
