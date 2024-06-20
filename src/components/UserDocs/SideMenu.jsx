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

const IndentedListItemText = (props) => {
  return <ListItemText {...props} sx={{ ml: 2 }} />;
};

export default function SideMenu() {
  const [isVideoTutorialsOpen, setIsVideoTutorialsOpen] = useState(false);

  const handleToggle = () => {
    setIsVideoTutorialsOpen(!isVideoTutorialsOpen);
  };
  // Table of Contents
  return (
    <Box sx={{ minWidth: 200, padding: 2 }}>
      <List>
        <ListItemButton>
          <ListItemText primary="Introduction" />
        </ListItemButton>
        <ListItemButton onClick={handleToggle}>
          <ListItemText primary="Video Tutorials" />
          {isVideoTutorialsOpen ? (
            <KeyboardArrowDown />
          ) : (
            <KeyboardArrowRight />
          )}
        </ListItemButton>
        <Collapse in={isVideoTutorialsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton>
              <IndentedListItemText primary="Video 1" />
            </ListItemButton>
            <ListItemButton>
              <IndentedListItemText primary="Video 2" />
            </ListItemButton>
            <ListItemButton>
              <IndentedListItemText primary="Video 3" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton>
          <ListItemText primary="Troubleshooting" />
        </ListItemButton>
      </List>
    </Box>
  );
}
