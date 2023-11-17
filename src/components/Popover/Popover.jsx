import * as React from "react";
// Style
import {
  Box,
  Button,
  TextField,
  Typography,
  Popover,
  useTheme,
  useMediaQuery,
} from "@mui/material/";
import "./Popover.css";

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="popover-container">
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Add Group
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: isMobile ? "top" : "bottom",
          horizontal: isMobile ? "center" : "left",
        }}
        transformOrigin={{
          vertical: isMobile ? "bottom" : "bottom",
          horizontal: isMobile ? "center" : "right",
        }}
      >
        <Box style={{ padding: "10px" }}>
          <Typography sx={{ p: 2, textAlign: "center", fontWeight: "bold" }}>
            New Group
          </Typography>
          <div>
            <div className="add-group-fields">
              <TextField label="Name"></TextField>
              <TextField label="Department"></TextField>
              <TextField label="Division"></TextField>
              <TextField label="Description"></TextField>
              <div className="add-group-btns">
                <Button>Cancel</Button>
                <Button>Save</Button>
              </div>
            </div>
          </div>
        </Box>
      </Popover>
    </div>
  );
}
