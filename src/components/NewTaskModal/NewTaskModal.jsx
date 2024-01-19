import React from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DatePicker from "../DatePicker/DatePicker";

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
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <LibraryAddIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Task
          </Typography>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <Select sx={{ margin: "5px 0" }}></Select>
            <Select sx={{ margin: "5px 0" }}></Select>
            <Select sx={{ margin: "5px 0" }}></Select>
            <Select sx={{ margin: "5px 0" }}></Select>
            <DatePicker />
          </div>

          <TextField
            id="outlined-multiline-static"
            label="Additional Details"
            multiline
            rows={4}
            fullWidth
            sx={{ margin: "10px auto" }}
          />

          <Button variant="contained" fullWidth>
            <AddBoxIcon sx={{ mr: 2 }} />
            Create Task
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
