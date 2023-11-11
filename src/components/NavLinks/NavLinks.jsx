import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// Component
import UserMenu from "../UserMenu/UserMenu";
// Style
import "./NavLinks.css";

export default function NavLinks() {
  const user = useSelector((store) => store.user);

  return (
    <div className="NavLinks-container">
      {/* If no user is logged in, show these links */}
      {!user.id && (
        // If there's no user, show login/registration links
        <Link className="navLink" to="/login">
          Login / Register
        </Link>
      )}

      {/* If a user is logged in, show these links */}
      {user.id && (
        <>
          <Link to="/home">Home</Link>
        </>
      )}

      <Link to="/about">About</Link>
    </div>
  );
}
