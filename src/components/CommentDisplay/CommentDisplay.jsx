import { Typography } from "@mui/material";
export default function CommentDisplay() {
  return (
    <div
      style={{
        height: "10vh",
        backgroundColor: "rgba(96, 96, 96, 0.1)",
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
      <li style={{ marginLeft: "15px" }}>Comment here</li>
    </div>
  );
}
