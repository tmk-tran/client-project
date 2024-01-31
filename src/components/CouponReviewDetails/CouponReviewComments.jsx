import { Typography, TextField } from "@mui/material";
import { border } from "../Utils/colors";
// ~~~~~~~~~~ Component ~~~~~~~~~
import CommentDisplay from "../CommentDisplay/CommentDisplay";
import CommentInput from "./CommentInput";
import "./CouponReviewDetails.css";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { mComments } from "../../hooks/reduxStore";
export default function CouponReviewComments() {
  const merchantComments = mComments() || [];
  console.log(merchantComments);

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

      {merchantComments.map((comment) => (
        <div className="comment-display-row">
          <CommentDisplay backgroundColor="" comment={comment} />
        </div>
      ))}

      <div style={{ width: "100%", marginTop: "auto" }}>
        <CommentInput />
      </div>
    </div>
  );
}
