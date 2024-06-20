import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

export default function SideMenu() {
  // Table of Contents
  return (
    <Box sx={{ minWidth: 200, padding: 2 }}>
      <Typography variant="h6">Table of Contents</Typography>
      <List>
        <ListItemButton>
          <ListItemText primary="Getting Started" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="FAQs" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Troubleshooting" />
        </ListItemButton>
      </List>
    </Box>
  );
}
