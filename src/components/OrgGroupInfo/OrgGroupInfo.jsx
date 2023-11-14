import React from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { capitalizeWords, styleImage } from "../Utils/helpers";
import "./OrgGroupInfo.css";

export default function OrgGroupInfoCard({ groupInfo }) {
  const history = useHistory();
  return (
    <Card
      elevation={6}
      id="orgGroup-details-container"
      onClick={() => history.push(`/group/${groupInfo.group_id}`)}
    >
      <CardContent>
        <div style={{ position: "relative" }}>
          {/* <div style={{ position: "absolute", top: 0, right: 0 }}>
            <Button>Edit</Button>
          </div> */}
          {groupInfo.group_photo ? (
            <center>
              <img
                // id="group-photo"
                src={groupInfo.group_photo}
                alt={`Group Photo for ${groupInfo.group_nickname}`}
                style={styleImage}
              />
            </center>
          ) : (
            <div className="no-photo-container">
              <Typography>No Photo</Typography>
            </div>
          )}
        </div>
        <Box style={{ flex: 1 }}></Box>
        <Typography variant="h6" style={{ textAlign: "center" }}>
          {capitalizeWords(groupInfo.group_nickname)}
        </Typography>
        <div>
          <hr />
          {/* <Typography sx={{ mt: 2 }}>
              Group Name: {capitalizeWords(groupInfo.group_nickname)}
            </Typography> */}
          <center>
            <Typography sx={{ mt: 2 }}>
              Department: {capitalizeWords(groupInfo.department)}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Division:{" "}
              {groupInfo.sub_department
                ? capitalizeWords(groupInfo.sub_department)
                : "N/A"}
            </Typography>
          </center>
          <Typography sx={{ mt: 2, fontWeight: "bold" }}>
            Description:
          </Typography>
          <Typography sx={{ overflowWrap: "break-word" }}>
            {/* Description:{" "} */}
            {groupInfo.group_description
              ? `${groupInfo.group_description
                  .charAt(0)
                  .toUpperCase()}${groupInfo.group_description
                  .slice(1)
                  .toLowerCase()}`
              : "None Entered"}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
