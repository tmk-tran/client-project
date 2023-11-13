import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TextField,
  Paper
} from "@mui/material";
import Fuse from "fuse.js";
import SearchIcon from "@mui/icons-material/Search";
import ArchivedOrganizationCard from "../ArchivedOrganizationCard/ArchivedOrganizationCard";


export default function ArchivedOrganizations() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_ARCHIVED_ORGANIZATIONS" });
  }, []);

  const user = useSelector((store) => store.user);
  const archivedList = useSelector((store) => store.archivedOrganizations);
  console.log("ARCHIVED", archivedList)

  return (
    <div className="organizationsContainer">
    <Paper elevation={6} style={{ width: "90%", margin: "0 auto" }}>
      <br />
      <center>
        <h1 className="organization-header">Archived Organizations</h1>
      </center>
      <div className="organizationsContainer">
        {archivedList?.map((organization, index) => (
          <ArchivedOrganizationCard key={index} organization={organization} />
        ))}
      </div>
      <br />
    </Paper>
  </div>
  );
}