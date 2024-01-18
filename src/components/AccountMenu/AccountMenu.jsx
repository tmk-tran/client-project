import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ display: "flex" }}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "white", backgroundColor: "#19338E" }}
        // variant="contained"
      >
        <PersonIcon />
        Username Here
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <Select placeholder="Username" displayEmpty inputProps={{ "aria-label": "Username" }}> */}
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Organizations</MenuItem>
        <MenuItem onClick={handleClose}>Merchants</MenuItem>
        <MenuItem onClick={handleClose}>Coupons</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      {/* </Select> */}
    </div>
  );
}
