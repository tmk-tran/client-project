import { Typography } from "@mui/material";
import { capitalizeFirstWord, formatDate } from "../Utils/helpers";
import { border } from "../Utils/colors";
export default function CommentDisplay({
  backgroundColor = "rgba(96, 96, 96, 0.1)",
  comment,
  showAllComments,
}) {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Check if the comment is null or undefined
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  if (!comment || comment.length === 0) {
    return (
      <div style={border}>
        <Typography>No Comments Available</Typography>
      </div>
    );
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const content = comment.comment_content;
  console.log(content);
  const user = comment.user;
  console.log(user);
  console.log(showAllComments);
  console.log(comment);
  const date = comment.formatted_date;
  console.log(date);
  const time = comment.formatted_time;
  console.log(time);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Display only the most recent comment if showAllComments is false
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const mostRecentComment = !showAllComments
    ? comment
    : [comment[comment.length - 1]];
  console.log(mostRecentComment);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
          <Typography variant="body2" sx={{ ml: 1, fontWeight: "bold" }}>
            {user}
          </Typography>
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
        {/* {content ? (
          <Typography variant="body2" sx={{ ml: 3 }}>
            {capitalizeFirstWord(content)}
          </Typography>
        ) : (
          <Typography>No Comments Available</Typography>
        )} */}
        {content !== undefined && content !== "" ? (
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
