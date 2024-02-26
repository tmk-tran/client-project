import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { primaryColor } from "../Utils/colors";

const ActionButton = ({ title, Icon, sx, onClick, onMouseOver, onMouseOut }) => {
  return (
    <Tooltip title={title}>
    <IconButton
      aria-label="launch"
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      sx={{
        // fontSize: "larger",
        height: "25px",
        width: "25px",
        color: primaryColor.color,
        "&:hover": {
          color: "#325CAB",
          transition: "transform 0.2s",
          cursor: "pointer",
        },
      }}
    >
      {/* <LaunchIcon sx={{ fontSize: "25px" }} /> */}
      <Icon sx={sx} />
    </IconButton>
    </Tooltip>
  );
};

export default ActionButton;
