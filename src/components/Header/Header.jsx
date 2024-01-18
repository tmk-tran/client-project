import AccountMenu from "../AccountMenu/AccountMenu";
import "./Header.css"
export default function Header() {
  return (
    <div style={{ height: "88px", backgroundColor: "#273B91" }}>
      <div style={{ height:"86px", width: "70vw", margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
      <img
      className="main-logo"
        src="../images/main-logo.jpg"
        alt="Preferred Saving Guide logo in colors blue and gold"
      />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <AccountMenu />
      </div>
      </div>
    </div>
  );
}
