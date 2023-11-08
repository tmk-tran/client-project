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
      </div>
      
      {/* Can remove this Card, just for fun  */}
      <Card elevation={6}>
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="h5">Your client project goes here</Typography>
          <Card elevation={6}>
            <CardContent>
              <img src="./images/psg-logo2.jpeg" alt="psg alternate logo" style={{ height: "300px", width: "300px" }} />
              <Typography variant="h5" style={{ textAlign: "center" }}>
                LET'S GOOOOOOO!
              </Typography>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      {/* End of Card, can remove when needed */}

    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
