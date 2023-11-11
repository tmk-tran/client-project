import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import NavLinks from "../NavLinks/NavLinks";
import { useDispatch, useSelector } from "react-redux";
// Style
import "./OrgDetails.css";
import { TextField, Typography, Card, CardContent } from "@mui/material";
// Components
import OrgContactDetails from "../OrgContactDetails/OrgContactDetails";
import OrgGroupInfo from "../OrgGroupInfo/OrgGroupInfo";

function orgDetails() {
  const paramsObject = useParams();
  const dispatch = useDispatch();

  const detailsOrg = useSelector((store) => store.orgDetailsReducer);

  useEffect(() => {
    dispatch({
      type: "FETCH_ORG_DETAILS",
      payload: paramsObject.id,
    });
  }, []);

  return (
    <div className="container">
      <Card elevation={6}>
        <CardContent>
          <center>
            <Typography variant="h6">Organization Details</Typography>
          </center>
          {/* <TextField label="Name Edit"></TextField> */}
          <div className="detailsOrg-container">
            {detailsOrg.map((info, i) => (
              <OrgContactDetails key={i} info={info} />
            ))}
            {detailsOrg.map((groupInfo, i) => (
              <OrgGroupInfo key={i} groupInfo={groupInfo} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default orgDetails;
