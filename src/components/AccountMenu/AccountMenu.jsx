import React from "react";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { historyHook } from "../../hooks/useHistory";
import { User } from "../../hooks/reduxStore";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Select, MenuItem, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import "./AccountMenu.css";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";

const AccountMenu = () => {
  const user = User();
  const history = historyHook();
  const dispatch = dispatchHook();

  const handleMenuChange = (event) => {
    // Handle menu item selection
    console.log(event.target.value);
  };

  return (
    <Select
      value=""
      onChange={handleMenuChange}
      displayEmpty
      inputProps={{ "aria-label": "Account Menu" }}
      style={{
        minWidth: "120px",
        backgroundColor: "#19338E",
        width: "216px",
        height: "48px",
        border: "1px solid gray",
        padding: "0 10px",
      }}
      renderValue={() => (
        <Typography
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <PersonIcon />
          &nbsp;&nbsp;{user.username}
        </Typography>
      )}
    >
      <MenuItem
        value="profile"
        onClick={() => {
          history.push(`/userProfile/${user.id}`);
        }}
      >
        Profile
      </MenuItem>
      <hr style={{ width: "90%" }} />
      <MenuItem
        value="tasks"
        onClick={() => {
          history.push("/tasks");
        }}
      >
        Tasks
      </MenuItem>
      <MenuItem
        value="organizations"
        onClick={() => {
          history.push("/home");
        }}
      >
        Accounts
      </MenuItem>
      {/* <MenuItem value="coupons">Coupons</MenuItem> */}
      <hr style={{ width: "90%" }} />
      <MenuItem value="logout" onClick={() => dispatch({ type: "LOGOUT" })}>Logout</MenuItem>
    </Select>
  );
};

export default AccountMenu;
