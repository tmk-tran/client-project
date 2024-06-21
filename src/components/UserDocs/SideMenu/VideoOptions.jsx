import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";

const IndentedListItemText = (props) => {
  return <ListItemText {...props} sx={{ ml: 2 }} />;
};

export default function VideoOptions({ isVideoTutorialsOpen }) {
  return (
    <>
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
    </>
  );
}
