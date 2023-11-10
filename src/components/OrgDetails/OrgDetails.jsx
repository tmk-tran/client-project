import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import NavLinks from "../NavLinks/NavLinks";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Typography, Card, CardContent } from "@mui/material";

function orgDetails() {
  const paramsObject = useParams();
  const dispatch = useDispatch();

  const detailsOrg = useSelector((store) => store.orgDetailsReducer);
  console.log(detailsOrg);

  useEffect(() => {
    dispatch({
      type: "FETCH_ORG_DETAILS",
      payload: paramsObject.id,
    });
  }, []);

  return (
    <div className="container">
      <center>
        <NavLinks />
      </center>
      <Card elevation={6}>
        <CardContent>
          <center>
          <Typography variant="h6">Organization Details</Typography>
          </center>
          {/* <TextField label="Name Edit"></TextField> */}
          {detailsOrg.map((info, i) => (
            <div key={i} className="org-details">
              <Typography variant="h6">{info.organization_name}</Typography>
              <Typography>{info.address}</Typography>
              <Typography>{info.city}</Typography>
              <Typography>{info.state}</Typography>
              <Typography>{info.zip}</Typography>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default orgDetails;
