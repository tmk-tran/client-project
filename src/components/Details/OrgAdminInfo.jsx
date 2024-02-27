import { Box, Typography } from "@mui/material";

export default function OrgAdminInfo() {
  return (
    <Box sx={{ position: "absolute", ml: 3, width: "30vw" }}>
      {/* <Typography>
        To start a new fundraiser:
        <ol>
          <li>
            <Typography variant="body2">
              Add a group using the Details section to the right
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Click on the group card below to add a new fundraiser
            </Typography>
          </li>
        </ol>
      </Typography>
      <Typography>
        To request more books for your fundraiser:
        <ul>
          <li>
            <Typography variant="body2">
              Click the 'Request Paper Books' button below contact information
            </Typography>
          </li>
        </ul>
      </Typography> */}
      <Typography sx={{ fontWeight: "bold" }}>
        Participating sellers are listed in the table under groups
        <ul>
          <li>
            <Typography variant="body2">
              Add a seller to the table using the 'New Seller' button
            </Typography>
          </li>
        </ul>
      </Typography>
    </Box>
  );
}
