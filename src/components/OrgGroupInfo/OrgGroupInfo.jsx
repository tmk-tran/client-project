import React from "react";
import { Typography, Card, CardContent } from "@mui/material";
import "./OrgGroupInfo.css";

export default function OrgGroupInfo({ groupInfo }) {
  return (
    <Card className="group-info" elevation={6}>
      <CardContent>
      <Typography>
        Department:{" "}
        {groupInfo.department &&
          groupInfo.department[0].toUpperCase() +
            groupInfo.department.slice(1).toLowerCase()}
      </Typography>
      <Typography>
        Sub-Department:{" "}
        {groupInfo.sub_department
          ? `${groupInfo.sub_department
              .charAt(0)
              .toUpperCase()}${groupInfo.sub_department.slice(1).toLowerCase()}`
          : "N/A"}
      </Typography>
      <Typography>
        Group Nickname:{" "}
        {groupInfo.group_nickname &&
          groupInfo.group_nickname[0].toUpperCase() +
            groupInfo.group_nickname.slice(1).toLowerCase()}
      </Typography>
      <Typography>Photo: {groupInfo.group_photo ?? "None"}</Typography>
      <Typography>
        Description:{" "}
        {groupInfo.group_description
          ? `${groupInfo.group_description
              .charAt(0)
              .toUpperCase()}${groupInfo.group_description
              .slice(1)
              .toLowerCase()}`
          : "None Entered"}
      </Typography>
      </CardContent>
    </Card>
  );
}
