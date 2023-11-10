import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import NavLinks from "../NavLinks/NavLinks";
import { useDispatch } from "react-redux";
import { TextField, Typography, Card, CardContent } from "@mui/material";

function orgDetails() {
  const paramsObject = useParams();
  const dispatch = useDispatch();

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
        <Typography variant="h5">Organization Details</Typography>
      </center>
      <Card elevation={6}>
        <CardContent>
          <Typography variant="h5">Details</Typography>
          <TextField label="Name Edit"></TextField>
        </CardContent>
      </Card>
    </div>
  );
}

export default orgDetails;
