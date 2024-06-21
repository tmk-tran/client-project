import React, { useState } from "react";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import VideoOptions from "./VideoOptions";
import MuiListItemButton from "../../ListItem/ListItemButton";

export default function SideMenu() {
  const [isVideoTutorialsOpen, setIsVideoTutorialsOpen] = useState(false);

  const handleToggle = () => {
    setIsVideoTutorialsOpen(!isVideoTutorialsOpen);
  };

  return (
    <Box sx={{ minWidth: 200, padding: 2 }}>
      <List>
        {/* ~~~~~ Introduction ~~~~~ */}
        <MuiListItemButton text="Introduction" />
        {/* ~~~~~ Video Tutorials ~~~~~ */}
        <MuiListItemButton
          text="Video Tutorials"
          onClick={handleToggle}
          state={isVideoTutorialsOpen}
          icon1={<KeyboardArrowDown />}
          icon2={<KeyboardArrowRight />}
        />
        {/* ~~~~~ Videos List ~~~~~ */}
        <VideoOptions isVideoTutorialsOpen={isVideoTutorialsOpen} />
        {/* ~~~~~ Troubleshooting ~~~~~ */}
        <MuiListItemButton text="Troubleshooting" />
      </List>
    </Box>
  );
}
