import React, { useState, useEffect } from "react";
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

const taskOptions = {
  Contact: ["Initial Contact", "Follow Up Call/Email/Text", "Follow Up Visit"],
  Book: ["Drop Off Books", "Organization Picking Up Books"],
  Task: [
    "Organization Dropping Books Off",
    "Received Payment",
    "Send Invoice",
    "Other",
  ],
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);

  const [firstMenuChoice, setFirstMenuChoice] = useState("");
  const [secondMenuChoice, setSecondMenuChoice] = useState("");
  const [thirdMenuChoice, setThirdMenuChoice] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFirstMenuChange = (event) => {
    const choice = event.target.value;
    setFirstMenuChoice(choice);
    setSecondMenuChoice(""); // Reset second menu choice when first menu changes
    setThirdMenuChoice(""); // Reset third menu choice when first menu changes
  };

  useEffect(() => {
    // Reset second menu choice when first menu changes
    setSecondMenuChoice("");
  }, [firstMenuChoice]);

  useEffect(() => {
    // Reset third menu choice when second menu changes
    if (!taskOptions[secondMenuChoice]?.includes(thirdMenuChoice)) {
      setThirdMenuChoice("");
    }
  }, [secondMenuChoice, thirdMenuChoice]);

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
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            New Task
          </Typography>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <Select
              value={firstMenuChoice}
              onChange={handleFirstMenuChange}
              sx={{ margin: "5px 0" }}
            >
              <MenuItem value="">Select...</MenuItem>
              <MenuItem value="Book">Book</MenuItem>
              <MenuItem value="Contact">Contact</MenuItem>
              <MenuItem value="Task">Task</MenuItem>
            </Select>

            <Select
              value={secondMenuChoice}
              onChange={(event) => {
                setSecondMenuChoice(event.target.value);
                setThirdMenuChoice(""); // Reset third menu when changing the second menu
              }}
              sx={{ margin: "5px 0" }}
            >
              <MenuItem value="">Select...</MenuItem>
              {taskOptions[firstMenuChoice]?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>

            <Select
              value={thirdMenuChoice}
              onChange={(event) => setThirdMenuChoice(event.target.value)}
              sx={{ margin: "5px 0" }}
            >
              <MenuItem value="">Select...</MenuItem>
              {taskOptions[secondMenuChoice]?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>

            <div style={{ margin: "0 auto" }}>
              <DatePicker />
            </div>
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
