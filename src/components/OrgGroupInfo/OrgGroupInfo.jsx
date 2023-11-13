import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  Typography,
} from "@mui/material";
import { capitalizeWords } from "../Utils/helpers";
import "./OrgGroupInfo.css";

export default function OrgGroupInfoCard({ groupInfo, groupNumber }) {
  return (
    <Card elevation={6} id="orgGroup-details-container">
      <CardContent>
        {groupInfo.group_photo ? (
          <img
            id="group-photo"
            src={groupInfo.group_photo}
            alt={`Group Photo for ${groupInfo.group_nickname}`}
          />
        ) : (
          <div style={{ margin: "15vh auto 0 auto" }}>
            <Typography>No Photo</Typography>
          </div>
        )}

        <Box style={{ flex: 1 }}></Box>
        <div>
          <hr />
          <Typography sx={{ mt: 2 }}>
            Group Name: {capitalizeWords(groupInfo.group_nickname)}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Department: {capitalizeWords(groupInfo.department)}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Division:{" "}
            {groupInfo.sub_department
              ? capitalizeWords(groupInfo.sub_department)
              : "N/A"}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Description:{" "}
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
