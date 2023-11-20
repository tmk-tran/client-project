import React, { useState } from "react";
// Style
import { Box, Card, CardContent, Tab, Tabs, Typography } from "@mui/material";
import "./OrgGroupTabs.css";
// Utils
import { capitalizeWords, centerDiv, styleImage } from "../Utils/helpers";
// Components
import TableGroupDetails from "../TableGroupDetails/TableGroupDetails";

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

export default function OrgGroupTabs({ groups, view1, view2, view3 }) {
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
      <br />
      <br />
      <Card id="OrgGroupTab-card" elevation={6}>
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
                    style={styleImage}
                  />
                </center>
              ) : (
                <div className="no-photo-container">
                  <Typography>No Photo</Typography>
                </div>
              )}
              <div style={{ margin: "0 auto" }}>
                {/* <Typography sx={{ mt: 2 }}>
                  Group Name: {capitalizeWords(group.group_nickname)}
                </Typography> */}
                {group.group_nickname ? (
                  <center>
                    <Typography variant="h6" sx={{ ta: "center" }}>
                      {capitalizeWords(group.group_nickname)}
                    </Typography>
                  </center>
                ) : (
                  <center>
                    <Typography variant="h6">No Group Name</Typography>
                  </center>
                )}
                <hr />

                {/* Option 1, view details */}
                {view1 ? (
                  <></>
                ) : (
                  <>
                    <div style={centerDiv}>
                      <TableGroupDetails groupInfo={group} />
                    </div>
                  </>
                )}

                {/* Option 2, view details */}

                {view2 ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Typography sx={{ mt: 2 }}>
                        <span style={{ textDecoration: "underline" }}>
                          <strong>Department</strong>
                        </span>{" "}
                        <br />
                        {capitalizeWords(group.department)}
                      </Typography>

                      <Typography sx={{ mt: 2 }}>
                        <span style={{ textDecoration: "underline" }}>
                          <strong>Division</strong>
                        </span>{" "}
                        <br />
                        {group.sub_department
                          ? capitalizeWords(group.sub_department)
                          : "N/A"}
                      </Typography>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {/* Option 3, view details */}
                {view3 ? (
                  <>
                    <center>
                      <Typography sx={{ mt: 2 }}>
                        <strong>Department:</strong>{" "}
                        {capitalizeWords(group.department)}
                      </Typography>
                      <Typography sx={{ mt: 2 }}>
                        <strong>Division:</strong>{" "}
                        {group.sub_department
                          ? capitalizeWords(group.sub_department)
                          : "N/A"}
                      </Typography>
                    </center>
                  </>
                ) : (
                  <></>
                )}

                {/* <div style={centerDiv}>
                  <TableGroupDetails groupInfo={group} />
                </div> */}
                {/* Description Section */}
                <Typography sx={{ mt: 2, fontWeight: "bold" }}>
                  Description:
                </Typography>
                <div
                  className="group-description-container"
                  style={{ maxHeight: "150px", overflowY: "auto" }}
                >
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
              </div>
            </CustomTabPanel>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
