import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// Component
import LogOutButton from "../LogOutButton/LogOutButton";
// Style
import "./Nav.css";
import PersonIcon from '@mui/icons-material/Person';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Client Project</h2>
      </Link>
      <div>
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
            <Link className="navLink" to="/user">
              Admin
            </Link>

            <Link className="navLink" to="/orgDetails">
              Organization Details
            </Link>

            <Link className="navLink" to="/user">
            <PersonIcon />
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
