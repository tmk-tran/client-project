import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    // position: "absolute",
    // top: 0,
    // right: 0,
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
  // Custom styles to make the SpeedDial smaller
  "& .MuiSpeedDial-fab": {
    width: "36px",
    height: "36px",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "28px", // Adjust the icon size
  },
}));

const actions = [
  { icon: <EditIcon />, name: "Edit" },
  { icon: <DeleteIcon />, name: "Delete" },
];

export default function PlaygroundSpeedDial({ handleDelete, location }) {
    console.log(location);
  const [direction, setDirection] = React.useState("left");
  console.log(direction);
  const [hidden, setHidden] = React.useState(false);

  const deleteClick = () => {
    handleDelete(location.id, location.merchant_id);
  };

  return (
    <Box>
      <Box sx={{ position: "relative" }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          hidden={hidden}
          icon={<MenuIcon />}
          direction={direction}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.name === "Delete" ? deleteClick : null}
            />
          ))}
        </StyledSpeedDial>
      </Box>
    </Box>
  );
}
