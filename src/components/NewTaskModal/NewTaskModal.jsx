import React, { useEffect, useState } from "react";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";
import { allMerchants, allOrganizations } from "../../hooks/reduxStore";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import DatePicker from "../DatePicker/DatePicker";
import SearchableSelect from "../NewTaskModal/SearchableSelect";
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

// ~~~~~~~~~ ADD USE ALERT HERE FOR SUCCESS ALERT ~~~~~~~~~~~~~~~~~~~ ADD USE ALERT HERE FOR SUCCESS ALERT ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
export default function BasicModal({
  merchantTab,
  customIcon,
  customText,
  caseType,
}) {
  console.log(merchantTab);
  const dispatch = dispatchHook();
  // ~~~~~~~~~~ All Merchants from store ~~~~~~~~~~
  const merchants = allMerchants();
  // ~~~~~~~~~~ All Organizations from store ~~~~~~~~~~
  const organizations = allOrganizations();
  // ~~~~~~~~~~ Modal State ~~~~~~~~~~
  const [open, setOpen] = useState(false);
  // ~~~~~~~~~~ Menu State ~~~~~~~~~~
  const [firstMenuChoice, setFirstMenuChoice] = useState("");
  const [secondMenuChoice, setSecondMenuChoice] = useState("");
  const [thirdMenuChoice, setThirdMenuChoice] = useState("");
  console.log(thirdMenuChoice);
  const [organizationId, setOrganizationId] = useState(null);
  const [merchantId, setMerchantId] = useState(null);
  const [fourthMenuChoice, setFourthMenuChoice] = useState("");
  const [couponDetails, setCouponDetails] = useState("");
  const [showDetailsInput, setShowDetailsInput] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [additionalDetails, setAdditionalDetails] = useState("");

  useEffect(() => {
    // Conditional logic based on merchantTab
    merchantTab
      ? /* Logic for merchantTab being true */
        (dispatch({ type: "FETCH_ALL_MERCHANTS" }),
        console.log("Merchant Tab is true"))
      : /* Logic for merchantTab being false */
        (dispatch({ type: "FETCH_ORGANIZATIONS" }),
        console.log("Merchant Tab is false"));

    // Cleanup function or dependencies for useEffect
  }, [merchantTab]);

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
    setShowDetailsInput(
      choice === "New Create Proof" || choice === "Add-on Request"
    );
  };

  const handleAccountChange = (event, value) => {
    const selectedName = value;


    if (merchantTab) {
      // Logic for merchantTab being true
      const selectedId =
        merchants.find((merchant) => merchant.merchant_name === selectedName)
          ?.id || "";

      setThirdMenuChoice(selectedName);
      setMerchantId(selectedId);
    } else {
      // Logic for merchantTab being false (organizations logic)
      const selectedId =
        organizations.find(
          (organization) => organization.organization_name === selectedName
        )?.id || "";

      setThirdMenuChoice(selectedName);
      setOrganizationId(selectedId);
    }
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
    const actionType = merchantTab
      ? "ADD_MERCHANT_TASK"
      : "ADD_ORGANIZATION_TASK";

    const payload = merchantTab
      ? {
          category: firstMenuChoice,
          task: secondMenuChoice,
          merchant_id: merchantId,
          merchant_name: thirdMenuChoice,
          assign: fourthMenuChoice,
          due_date: dueDate,
          description: additionalDetails,
          task_status: "New",
          coupon_details: couponDetails,
        }
      : {
          // Adjust the payload properties for organization logic
          // Example:
          category: firstMenuChoice,
          task: secondMenuChoice,
          organization_id: organizationId,
          organization_name: thirdMenuChoice,
          assign: fourthMenuChoice,
          due_date: dueDate,
          description: additionalDetails,
          task_status: "New",
          // Adjust other properties as needed
        };

    dispatch({
      type: actionType,
      payload: payload,
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
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~ FIRST DROPDOWN ~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
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
            {/* ~~~~~~~~~~~~~~~~ END ~~~~~~~~~~~~~~~~~~~~ */}

            <InputLabel>Task:</InputLabel>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~ SECOND DROPDOWN ~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
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
            {/* ~~~~~~~~~~~~~~~~ END ~~~~~~~~~~~~~~~~~~~~ */}

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

            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~ THIRD DROPDOWN ~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            <InputLabel>Account Name:</InputLabel>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~ SEARCHABLE FIELD ~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}  
            <SearchableSelect
              thirdMenuChoice={thirdMenuChoice}
              handleAccountChange={handleAccountChange}
              merchantTab={merchantTab}
              merchants={merchants}
              organizations={organizations}
            />
            {/* ~~~~~~~~~~~~~~~~ END ~~~~~~~~~~~~~~~~~~~~ */}

            <InputLabel>Assign To:</InputLabel>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~ FOURTH DROPDOWN ~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
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
            {/* ~~~~~~~~~~~~~~~~ END ~~~~~~~~~~~~~~~~~~~~ */}

            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~~ DATE SECTION ~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            <div>
              <DatePicker initialDate={dueDate} onChange={handleDateChange} />
            </div>
            {/* ~~~~~~~~~~~~~~~~ END ~~~~~~~~~~~~~~~~~~~~ */}
          </div>

          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~ ADDITIONAL DETAILS ~~~~~~~~~~ */}
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          <TextField
            id="outlined-multiline-static"
            label="Additional Details..."
            multiline
            rows={3}
            fullWidth
            sx={{ margin: "10px auto" }}
            onChange={(event) => setAdditionalDetails(event.target.value)}
          />
          {/* ~~~~~~~~~~~~~~~~ END ~~~~~~~~~~~~~~~~~~~~ */}

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
