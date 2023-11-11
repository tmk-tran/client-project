import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, CardContent, Typography, CardMedia, Button, } from "@mui/material";
import OrganizationCard from "../OrganizationCard/OrganizationCard";
import "./UserPage.css"

function UserPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_ORGANIZATIONS" });
  }, []);
 
  const user = useSelector((store) => store.user);
  const organizationsList = useSelector((store) => store.organizations);

  return (
    <div className="container">
      <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
      </div>
    <div className="organizationsContainer">
      {organizationsList.map((organization, index) => {
        return <OrganizationCard key={index} organization={organization}/>
      })}
    </div>

    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
