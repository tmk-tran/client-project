import React from "react";
import { useHistory } from "react-router-dom";
// Style
import { Card, CardContent, Typography } from "@mui/material";
// Utils
import { capitalizeWords, centerStyle, styleImage } from "../Utils/helpers";
import "./OrgGroupInfo.css";
// Components
import TableGroupDetails from "../TableGroupDetails/TableGroupDetails";

export default function OrgGroupInfoCard({ groupInfo, view1, view2, view3 }) {
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
        <br />
        {groupInfo.group_nickname ? (
          <center>
            <Typography variant="h6" sx={{ ta: "center" }}>
              {capitalizeWords(groupInfo.group_nickname)}
            </Typography>
          </center>
        ) : (
          <center>
            <Typography variant="h6">No Group Name</Typography>
          </center>
        )}

        <div>
          <hr />

          <center>
            {/* Option 1, view details */}
            {view1 ? (
              <>
                <Typography sx={{ mt: 2 }}>
                  <strong>Department:</strong>{" "}
                  {capitalizeWords(groupInfo.department)}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  <strong>Division:</strong>{" "}
                  {groupInfo.sub_department
                    ? capitalizeWords(groupInfo.sub_department)
                    : "N/A"}
                </Typography>
              </>
            ) : (
              <></>
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
                    {capitalizeWords(groupInfo.department)}
                  </Typography>

                  <Typography sx={{ mt: 2 }}>
                    <span style={{ textDecoration: "underline" }}>
                      <strong>Division</strong>
                    </span>{" "}
                    <br />
                    {groupInfo.sub_department
                      ? capitalizeWords(groupInfo.sub_department)
                      : "N/A"}
                  </Typography>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* Option 3, view details */}
            {view3 ? (
              <></>
            ) : (
              <>
                <div>
                  <TableGroupDetails groupInfo={groupInfo} />
                </div>
              </>
            )}
          </center>

          {/* Description Section */}
          <Typography sx={{ mt: 2, fontWeight: "bold" }}>
            Description:
          </Typography>
          <div
            className="group-description-container"
            style={{ maxHeight: "150px", overflowY: "auto" }}
          >
            <Typography sx={{ overflowWrap: "break-word" }}>
              {groupInfo.group_description
                ? `${groupInfo.group_description
                    .charAt(0)
                    .toUpperCase()}${groupInfo.group_description
                    .slice(1)
                    .toLowerCase()}`
                : "None Entered"}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
