import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// Component
import UserMenu from "../UserMenu/UserMenu";
import LogoPSG from "../LogoPSG/LogoPSG";
import NavLinks from "../NavLinks/NavLinks";
// Style
import "./Nav.css";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <>
      <div className="nav">
        <div></div>
        <Link to="/home">
          <h2 className="nav-title">
            <LogoPSG />
          </h2>
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
                <UserMenu />
              </Link>
            </>
          )}
          
        </div>
      </div>
      <div className="NavLinks-container">
        <NavLinks />
      </div>
    </>
  );
}

export default Nav;
