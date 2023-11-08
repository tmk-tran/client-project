import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";

import { Card, CardContent, Typography } from "@mui/material";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        {/* <LogOutButton className="btn" /> */}
      </div>
      <Card elevation={6}>
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="h6">Your client project goes here</Typography>
          <br />
          <br />
          <br />
          <Card elevation={6}>
            <CardContent>
              <Typography variant="h5" style={{ textAlign: "center" }}>
                LET'S GOOOOOOO!
              </Typography>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
