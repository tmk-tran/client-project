import React, { useState } from "react";
import PropTypes from "prop-types";
// Style
import { Box, Card, CardContent, Tab, Tabs, Typography } from "@mui/material";
// Utils
import { capitalizeWords, styleImage } from "../Utils/helpers";
// import "../OrgGroupInfo/OrgGroupInfo.css";
import "./OrgGroupTabs.css";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

export default function OrgGroupTabs({ groups }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `org-tab-${index}`,
      "aria-controls": `org-tabpanel-${index}`,
    };
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="org group tabs">
          {groups.map((group, index) => (
            <Tab
              key={index}
              label={`Group ${index + 1}`}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      <br /><br />
      <Card id="OrgGroupTab-card" elevation={6} >
        <CardContent>
          {groups.map((group, index) => (
            <CustomTabPanel key={index} value={value} index={index}>
              {/* Render the content of each tab here */}
              {/* You can customize this based on your group structure */}
              {group.group_photo ? (
                <center>
                  <img
                    id="group-photo"
                    src={group.group_photo}
                    alt={`Group Photo for ${group.group_nickname}`}
                    // style={styleImage}
                  />
                </center>
              ) : (
                <div className="no-photo-container">
                  <Typography>No Photo</Typography>
                </div>
              )}
              <hr />
              <div style={{ width: "60%", margin: "0 auto" }}>
              <Typography sx={{ mt: 2 }}>
                Group Name: {capitalizeWords(group.group_nickname)}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Department: {capitalizeWords(group.department)}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Division:{" "}
                {group.sub_department
                  ? capitalizeWords(group.sub_department)
                  : "N/A"}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Description:{" "}
                {group.group_description
                  ? `${group.group_description
                      .charAt(0)
                      .toUpperCase()}${group.group_description
                      .slice(1)
                      .toLowerCase()}`
                  : "None Entered"}
              </Typography>
              </div>
            </CustomTabPanel>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
