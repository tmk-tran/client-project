import React, { useState } from "react";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import DatePicker from "../DatePicker/DatePicker";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
// ~~~~~~~~~~ Icons ~~~~~~~~~~
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CloseIcon from "@mui/icons-material/Close";

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
  Coupon: ["Add-on Request", "New Create Proof", "Update Create Proof"],
  Book: ["Drop Off Books", "Organization Picking Up Books"],
  Task: [
    "Organization Dropping Books Off",
    "Received Payment",
    "Send Invoice",
    "Other",
  ],
};

const userOptions = ["Chris", "Lacey", "Wendy"];

export default function BasicModal({
  merchantTab,
  customIcon,
  customText,
  caseType,
}) {
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

  return (
    <div>
      <Button onClick={handleOpen} fullWidth>
        {customIcon ? (
          customIcon // Render the custom icon if provided
        ) : (
          <LibraryAddIcon />
        )}
        {customText && <span>&nbsp;{customText}</span>}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <Button onClick={handleClose}>
              <CloseIcon />
            </Button>
            <Typography variant="h6" sx={{ textAlign: "center", mb: 3 }}>
              New Task
            </Typography>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <InputLabel>Category:</InputLabel>
            {/* First Dropdown */}
            <Select
              value={firstMenuChoice}
              onChange={handleFirstMenuChange}
              sx={{ margin: "5px 0" }}
            >
              <MenuItem value="Book">Book</MenuItem>
              {(merchantTab || caseType === "merchantView") && (
                <MenuItem value="Coupon">Coupon</MenuItem>
              )}
              <MenuItem value="Contact">Contact</MenuItem>
              <MenuItem value="Task">Task</MenuItem>
            </Select>

            <InputLabel>Task:</InputLabel>
            {/* Second Dropdown */}
            <Select
              value={secondMenuChoice}
              onChange={(event) => {
                setSecondMenuChoice(event.target.value);
                setThirdMenuChoice(""); // Reset third menu when changing the second menu
              }}
              sx={{ margin: "5px 0" }}
            >
              {taskOptions[firstMenuChoice]?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>

            <InputLabel>Assign To:</InputLabel>
            {/* Third Dropdown */}
            <Select
              value={thirdMenuChoice}
              onChange={(event) => setThirdMenuChoice(event.target.value)}
              sx={{ margin: "5px 0" }}
            >
              {userOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>

            <div>
              <DatePicker />
            </div>
          </div>

          <TextField
            id="outlined-multiline-static"
            label="Additional Details..."
            multiline
            rows={4}
            fullWidth
            sx={{ margin: "10px auto" }}
          />

          <Button variant="contained" color="secondary" fullWidth>
            <AddBoxIcon sx={{ mr: 2 }} />
            Create Task
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
