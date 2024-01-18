// ~~~~~~~~~~ Component ~~~~~~~~~~
import AccountMenu from "../AccountMenu/AccountMenu";
import NavLinks from "../NavLinks/NavLinks";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import "./Header.css";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { User } from "../../hooks/reduxStore";
export default function Header() {
  const user = User();
  return (
    <>
      <div style={{ height: "88px", backgroundColor: "#273B91" }}>
        <div
          style={{
            height: "86px",
            width: "70vw",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <img
            className="main-logo"
            src="../images/main-logo.jpg"
            alt="Preferred Saving Guide logo in colors blue and gold"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* If a user is logged in, show these links */}
            {user.id && (
              <>
                <AccountMenu />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="NavLinks-container">
        <NavLinks />
      </div>
    </>
  );
}
