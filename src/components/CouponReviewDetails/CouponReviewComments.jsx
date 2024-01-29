import { Typography, TextField } from "@mui/material";
import { border } from "../Utils/colors";
// ~~~~~~~~~~ Component ~~~~~~~~~
import CommentDisplay from "../CommentDisplay/CommentDisplay";
import CommentInput from "./CommentInput";
import "./CouponReviewDetails.css";

export default function CouponReviewComments({ comment }) {
  
  return (
    <div
      style={{
        width: "50%",
        position: "relative",
        ...border,
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

      <div style={{ height: "415px", overflowY: "auto" }}>
        <div className="comment-display-row">
          <CommentDisplay backgroundColor="" comment={comment} />
        </div>
      </div>

      <div style={{ width: "100%", marginTop: "auto" }}>
        <CommentInput />
      </div>
    </div>
  );
}
