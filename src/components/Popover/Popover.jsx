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
import CloseIcon from "@mui/icons-material/Close";
import "./Popover.css";
import { modalBtnStyle } from "../Utils/helpers";

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
        <Box style={{ padding: "20px" }}>
          <div>
            <Typography sx={{ p: 2, textAlign: "center", fontWeight: "bold" }}>
              New Group
            </Typography>
          </div>
          <div>
            <div className="add-group-fields">
              <TextField fullWidth label="Name"></TextField>
              <TextField fullWidth label="Department"></TextField>
              <TextField fullWidth label="Division"></TextField>
              <TextField multiline rows={2} label="Description"></TextField>
            </div>
            <div style={modalBtnStyle}>
              <Button className="modal-cancel-btn">Cancel</Button>
              <Button>Save</Button>
            </div>
          </div>
        </Box>
      </Popover>
    </div>
  );
}
