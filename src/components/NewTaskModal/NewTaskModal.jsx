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
import "./NewTaskModal.css";
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
const accountOptions = ["Account Name 1", "Account Name 2", "Account Name 3"];

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
  const [fourthMenuChoice, setFourthMenuChoice] = useState("");
  const [couponDetails, setCouponDetails] = useState("");
  const [showDetailsInput, setShowDetailsInput] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFirstMenuChange = (event) => {
    const choice = event.target.value;
    setFirstMenuChoice(choice);
    setSecondMenuChoice("");
    setThirdMenuChoice("");
  };

  const handleSecondMenuChange = (event) => {
    const choice = event.target.value;
    setSecondMenuChoice(choice);
    setThirdMenuChoice("");

    // Check if the selected option requires showing the details input
    setShowDetailsInput(choice === "New Create Proof");
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
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Button
              className="close-btn"
              onClick={handleClose}
              style={{ position: "absolute", left: 0 }}
            >
              <CloseIcon />
            </Button>
            <Typography variant="h6" sx={{ textAlign: "center", flexGrow: 1 }}>
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
              onChange={handleSecondMenuChange}
              sx={{ margin: "5px 0" }}
            >
              {taskOptions[firstMenuChoice]?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>

            {showDetailsInput && (
              <TextField
                id="outlined-multiline-static"
                label="Coupon Details"
                placeholder="Please enter coupon details here..."
                fullWidth
                multiline
                rows={2}
                value={couponDetails}
                onChange={(event) => setCouponDetails(event.target.value)}
                sx={{ margin: "10px auto" }}
              />
            )}

            {/* Third Dropdown */}
            <InputLabel>Account Name:</InputLabel>
            <Select
              value={thirdMenuChoice}
              onChange={(event) => setThirdMenuChoice(event.target.value)}
              sx={{ margin: "5px 0" }}
            >
              {accountOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>

            <InputLabel>Assign To:</InputLabel>
            {/* Fourth Dropdown */}
            <Select
              value={fourthMenuChoice}
              onChange={(event) => setFourthMenuChoice(event.target.value)}
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
            rows={3}
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
