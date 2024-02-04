import React, { useState, useRef } from "react";
import { TextField, Button, IconButton, Paper } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";
import { User } from "../../hooks/reduxStore";
import CouponDesign from "../CouponDesign/CouponDesign";
import { border } from "../Utils/colors";

export default function CommentInput({
  merchantId,
  taskId,
  onSubmit,
  onChange,
}) {
  console.log(merchantId);
  console.log(taskId);
  const [comment, setComment] = useState("");
  const [commentAdded, setCommentAdded] = useState(false);
  const [addedFileName, setAddedFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(selectedFile);
  console.log(addedFileName);
  console.log(commentAdded);
  console.log(comment);
  const user = User() || [];
  console.log(user.username);
  const currentUsername = user.username;
  console.log(currentUsername);

  const fileInputRef = useRef(null); // Add useRef here
  console.log(fileInputRef);

  const dispatch = dispatchHook();

  const newComment = {
    merchant_id: merchantId,
    comment_content: comment,
    user: currentUsername,
    task_id: taskId,
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected File:", file);
    console.log(file.name);
    setAddedFileName(file.name);

    setSelectedFile(file);
  };

  const handleFileUploadClick = () => {
    // Trigger the file input click event to open the file selection screen
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Now you can use 'selectedFile' to perform any actions or dispatch the action
      dispatch({ type: "UPLOAD_PDF_REQUEST", payload: { selectedFile } });
    } else {
      console.log("No file selected");
    }
  };

  const handleSubmit = () => {
    // Handle comment submission logic
    console.log("Comment submitted:", newComment);
    dispatch({ type: "ADD_MERCHANT_COMMENT", payload: newComment });
    setCommentAdded(true);
    setComment("");
    onSubmit();
    onChange();
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
      {/* Display the selected file name */}
      {selectedFile && (
        <div>
          <p>Selected File: {selectedFile.name}</p>
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}

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
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <IconButton color="primary" onClick={handleFileUploadClick}>
          <AttachFileIcon />
        </IconButton>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Paper>
  );
}
