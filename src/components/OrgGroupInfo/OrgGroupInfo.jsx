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
import { style } from "../Utils/helpers";

const theme = createTheme({
  typography: {
    fontSize: 18,
    //   fontFamily: "Telugu Sangam MN",
  },
});

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
            {groupInfo.group_photo ? (
              <img
                id="group-photo"
                src={groupInfo.group_photo}
                alt={`Group Photo for ${groupInfo.group_nickname}`}
              />
            ) : (
              <div style={{ margin: "15vh auto 0 auto" }}>
                <Typography>No Photo</Typography>
              </div>
            )}

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
