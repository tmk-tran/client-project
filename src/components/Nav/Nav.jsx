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
          <div className="logoPSG-container">
            <Link to="/home" className="logo-psg">
              <LogoPSG />
            </Link>
          </div>
        <div>
          {/* If a user is logged in, show these links */}
          {user.id && (
            <>
              <UserMenu />
            </>
          )}
        </div>
      </div>
      <br />
      <>
      <div className="NavLinks-container">
        <NavLinks />
      </div></>
    </>
  );
}
export default Nav;