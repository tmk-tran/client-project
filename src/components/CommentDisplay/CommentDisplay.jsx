import { Typography } from "@mui/material";
import { capitalizeFirstWord, formatDate } from "../Utils/helpers";
import { border } from "../Utils/colors";
export default function CommentDisplay({
  backgroundColor = "rgba(96, 96, 96, 0.1)",
  comment,
  mId,
}) {
  const merchantId = mId;
  console.log(merchantId);
  const date = formatDate(comment.date);
  console.log(date);
  const time = comment.time;
  const content = comment.comment_content;
  console.log(content);
  const user = comment.user;

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
          <Typography sx={{ ml: 1 }}>{user}</Typography>
        </div>
        <div>
          <Typography variant="body2" sx={{ ml: 3, mt: 0.4 }}>
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
        <Typography variant="body2" sx={{ ml: 3 }}>
          {capitalizeFirstWord(content)}
        </Typography>
      </div>
    </div>
  );
}
