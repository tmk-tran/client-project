import React from "react";
import { Link } from "react-router-dom";
// ~~~~~~~~~~ Component ~~~~~~~~~~
import UserMenu from "../UserMenu/UserMenu";
import LogoPSG from "../LogoPSG/LogoPSG";
import NavLinks from "../NavLinks/NavLinks";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import "./Nav.css";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { User } from "../../hooks/reduxStore";
function Nav() {
  const user = User();

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
        </div>
      </>
    </>
  );
}
export default Nav;
