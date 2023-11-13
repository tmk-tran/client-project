import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { capitalizeWords } from "../Utils/helpers";

const theme = createTheme({
  typography: {
    fontSize: 18,
    //   fontFamily: "Telugu Sangam MN",
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  height: "50vh",
  display: "flex",
  flexDirection: "column",
};

export default function GroupInfoModal({ groupInfo, groupNumber }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button onClick={handleOpen}>Group {groupNumber}</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography>
              {groupInfo.group_photo ? (
                <img
                  src={groupInfo.group_photo}
                  alt={`Group Photo for ${groupInfo.group_nickname}`}
                  style={{ height: "150px", width: "150px" }}
                />
              ) : (
                "No Photo"
              )}
            </Typography>
            <Box style={{ flex: 1 }}></Box>
            <div>
              <hr />
              <Typography>
                Group Name: {capitalizeWords(groupInfo.group_nickname)}
              </Typography>
              <Typography>
                Department: {capitalizeWords(groupInfo.department)}
              </Typography>
              <Typography>
                Division:{" "}
                {groupInfo.sub_department
                  ? capitalizeWords(groupInfo.sub_department)
                  : "N/A"}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Description:{" "}
                {groupInfo.group_description
                  ? `${groupInfo.group_description
                      .charAt(0)
                      .toUpperCase()}${groupInfo.group_description
                      .slice(1)
                      .toLowerCase()}`
                  : "None Entered"}
              </Typography>
            </div>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}
