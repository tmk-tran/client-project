import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// Style
import { Typography } from "@mui/material";
import "./NavLinks.css";

export default function NavLinks() {
  const user = useSelector((store) => store.user);

  return (
    <div className="NavLinks-container">
      {/* If no user is logged in, show these links */}
      {!user.id && (
        // If there's no user, show login/registration links
        <>
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
          <Link className="navLink" to="/about">
            About
          </Link>
        </>
      )}

      {/* If a user is logged in, show these links */}
      {user.id && (
        <>
          <Link to="/home">
            <Typography>Home</Typography>
          </Link>
          <li>Groups</li>
          <li>Add New Fundraiser</li>
          <Link to="/about">About</Link>
        </>
      )}
    </div>
  );
}
