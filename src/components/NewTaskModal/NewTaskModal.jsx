import React, { useEffect, useState } from "react";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";
import { allMerchants } from "../../hooks/reduxStore";
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
import CloseIcon from "@mui/icons-material/Close";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { border } from "../Utils/colors";

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
  const dispatch = dispatchHook();
  // ~~~~~~~~~~ All merchants from store ~~~~~~~~~~
  const merchants = allMerchants();
  // ~~~~~~~~~~ Modal State ~~~~~~~~~~
  const [open, setOpen] = useState(false);
  // ~~~~~~~~~~ Menu State ~~~~~~~~~~
  const [firstMenuChoice, setFirstMenuChoice] = useState("");
  const [secondMenuChoice, setSecondMenuChoice] = useState("");
  const [thirdMenuChoice, setThirdMenuChoice] = useState("");
  const [merchantId, setMerchantId] = useState(null);
  const [fourthMenuChoice, setFourthMenuChoice] = useState("");
  const [couponDetails, setCouponDetails] = useState("");
  const [showDetailsInput, setShowDetailsInput] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [additionalDetails, setAdditionalDetails] = useState("");

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_MERCHANTS" });
  }, []);

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

  const handleMerchantChange = (event) => {
    const selectedName = event.target.value;
    const selectedId =
      merchants.find((merchant) => merchant.merchant_name === selectedName)
        ?.id || "";

    setThirdMenuChoice(selectedName);
    setMerchantId(selectedId);
  };

  const handleDateChange = (date) => {
    const formattedDate = date.$d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    setDueDate(formattedDate);
  };

  const addNewTask = () => {
    dispatch({
      type: "ADD_MERCHANT_TASK",
      payload: {
        category: firstMenuChoice,
        task: secondMenuChoice,
        merchant_id: merchantId,
        merchant_name: thirdMenuChoice,
        assign: fourthMenuChoice,
        due_date: dueDate,
        description: additionalDetails,
        task_status: "New",
        coupon_details: couponDetails,
      },
    });

    // Reset fields on submit
    setFirstMenuChoice("");
    setSecondMenuChoice("");
    setThirdMenuChoice("");
    setMerchantId(null);
    setFourthMenuChoice("");
    setDueDate("");
    setShowDetailsInput(false);
    setAdditionalDetails("");
    setCouponDetails("");
    setAdditionalDetails("");
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} fullWidth>
        {customIcon ? (
          customIcon // Render the custom icon if provided
        ) : (
          // <LibraryAddIcon />
          <AddBoxIcon />
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
              onChange={handleMerchantChange}
              sx={{ margin: "5px 0" }}
            >
              {/* Populate the dropdown with the list of merchants */}
              {merchants.map((merchant) => (
                <MenuItem key={merchant.id} value={merchant.merchant_name}>
                  {console.log(merchant.id)}
                  {merchant.merchant_name}
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
              <DatePicker initialDate={dueDate} onChange={handleDateChange} />
            </div>
          </div>

          <TextField
            id="outlined-multiline-static"
            label="Additional Details..."
            multiline
            rows={3}
            fullWidth
            sx={{ margin: "10px auto" }}
            onChange={(event) => setAdditionalDetails(event.target.value)}
          />

          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={addNewTask}
          >
            <AddBoxIcon sx={{ mr: 2 }} />
            Create Task
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
