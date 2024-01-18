import React from "react";
import { Select, MenuItem, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import "./AccountMenu.css";

const AccountMenu = () => {
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
      }}
      renderValue={(
        selected // <-- this allows the menu item to not be shown for username, just the placeholder on the menu is shown instead
      ) => (
        <Typography style={{ color: selected ? "black" : "white" }}>
          {selected || "Username"}
        </Typography>
      )}
    >
      <MenuItem value="profile">Profile</MenuItem>
      <hr style={{ width: "80%" }} />
      <MenuItem value="organizations">Organizations</MenuItem>
      <MenuItem value="merchants">Merchants</MenuItem>
      <MenuItem value="coupons">Coupons</MenuItem>
      <hr style={{ width: "80%" }} />
      <MenuItem value="logout">Logout</MenuItem>
    </Select>
  );
};

export default AccountMenu;
