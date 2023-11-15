import * as React from "react";
// Style
import { Box, Button, TextField, Typography, Popover } from "@mui/material/";

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        // anchorOrigin={{
        //   vertical: "bottom",
        //   horizontal: "left",
        // }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box style={{ padding: "10px" }}>
        <Typography sx={{ p: 2, textAlign: "center", fontWeight: "bold" }}>New Group</Typography>
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
        </Box>
      </Popover>
    </div>
  );
}
