import { Typography } from "@mui/material";
import { capitalizeFirstWord, formatDate } from "../Utils/helpers";
import { border } from "../Utils/colors";
export default function CommentDisplay({
  backgroundColor = "rgba(96, 96, 96, 0.1)",
  comment,
  mId,
  showAllComments = true,
  key,
  caseType,
}) {
  const merchantId = mId;
  console.log(merchantId);
  console.log(key);
  const date = formatDate(comment.date);
  const time = comment.time;
  const content = comment.comment_content;
  const user = comment.user;

  console.log(showAllComments);
  console.log(comment);

  if (!comment || comment.length === 0) {
    return <Typography>No Comments Available</Typography>;
  }

  // Display only the most recent comment if showAllComments is false
  const mostRecentComment = !showAllComments
    ? comment
    : [comment[comment.length - 1]];
  console.log(mostRecentComment);

  return (
    <div
      style={{
        // height: "10vh",
        // backgroundColor: "rgba(96, 96, 96, 0.1)",
        backgroundColor: backgroundColor,
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <Typography variant="body2" sx={{ ml: 1, fontWeight: "bold" }}>{user}</Typography>
        </div>
        <div>
          <Typography variant="caption" sx={{ ml: 3, mt: 0.4 }}>
            {date} - {time}
          </Typography>
        </div>
      </div>

      <div style={{ marginLeft: "15px", position: "relative" }}>
        <span
          style={{
            position: "absolute",
            fontSize: "20px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          •
        </span>
        {content ? (
          <Typography variant="body2" sx={{ ml: 3 }}>
            {capitalizeFirstWord(content)}
          </Typography>
        ) : (
          <Typography>No Comments Available</Typography>
        )}
      </div>
    </div>
  );
}
