// ~~~~~~~~~~ Component ~~~~~~~~~~
import AccountMenu from "../AccountMenu/AccountMenu";
import NavLinks from "../NavLinks/NavLinks";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import "./Header.css";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { User } from "../../hooks/reduxStore";
import { border } from "../Utils/colors";
import { historyHook } from "../../hooks/useHistory";

export default function Header() {
  const user = User();
  const history = historyHook();

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
            position: "relative",
          }}
        >
          <img
            className="main-logo"
            src="../images/main-logo.jpg"
            alt="Preferred Saving Guide logo in colors blue and gold"
            onClick={() => history.push("/home")}
            style={{ cursor: "pointer" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* If a user is logged in, show these links */}
            <div>
              {user.id && (
                <>
                  <AccountMenu />
                </>
              )}
              {/* <ShoppingCartIcon sx={{ position: "absolute", right: 1, top: 0 }} /> */}
            </div>
          </div>
        </div>
        {/* <div style={{ flexGrow: 1, ...border, height: "25px" }}></div> */}
        <div style={{ position: "absolute", right: "10%", top: "3%" }}>
          <ShoppingCartIcon
            sx={{ color: "ghostwhite", cursor: "pointer" }}
            onClick={() => history.push("/checkout")}
          />
        </div>
      </div>
      <div className="NavLinks-container">
        <NavLinks />
      </div>
    </>
  );
}

{
  /* <>
    <div style={{ height: "88px", backgroundColor: "#273B91" }}>
      <div
        style={{
          height: "86px",
          width: "70vw",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          ...border,
        }}
      >
        <img
          className="main-logo"
          src="../images/main-logo.jpg"
          alt="Preferred Saving Guide logo in colors blue and gold"
        />
        {user.id && <AccountMenu />}
        <div style={{ display: "flex", alignItems: "center" }}>
          <ShoppingCartIcon />
        </div>
      </div>
      <div style={{ flexGrow: 1, ...border, height: "25px" }}></div>
    </div>
    <div className="NavLinks-container">
      <NavLinks />
    </div>
  </>
);
} */
}
