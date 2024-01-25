import { Typography } from "@mui/material";
export default function CommentDisplay({
  backgroundColor = "rgba(96, 96, 96, 0.1)",
}) {
  return (
    <div
      style={{
        height: "10vh",
        // backgroundColor: "rgba(96, 96, 96, 0.1)",
        backgroundColor: backgroundColor,
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <Typography sx={{ ml: 1 }}>Username</Typography>
        </div>
        <div>
          <Typography variant="body2" sx={{ ml: 3, mt: 0.4 }}>
            time/date
          </Typography>
        </div>
      </div>
      {/* <li style={{ marginLeft: "15px" }}>Comment here</li> */}
      <div style={{ marginLeft: "15px", position: "relative" }}>
        {/* <span style={{ position: "absolute" }}>•</span> */}
        <span
          style={{
            position: "absolute",
            fontSize: "25px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          •
        </span>
        <Typography variant="body2" sx={{ ml: 3 }}>
          Comment Here
        </Typography>
      </div>
    </div>
  );
}
