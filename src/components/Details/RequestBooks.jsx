import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Modal,
  Divider,
} from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~ //
import { dispatchHook } from "../../hooks/useDispatch";
import { requestBooksSweetAlert } from "../Utils/sweetAlerts";
import { lineDivider } from "../Utils/modalStyles";
// ~~~~~~~~~~ Components ~~~~~~~~~~ //
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ModalButtons from "../Modals/ModalButtons";
import CustomButton from "../CustomButton/CustomButton";

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

export default function RequestBooks() {
  const dispatch = dispatchHook();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(0);

  const handleOpen = () => setOpen(true);

  const resetForm = () => {
    setInputValue(0);
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const handleSave = () => {
    console.log(inputValue);
    const requestAction = {
      type: "REQUEST_BOOKS",
      payload: inputValue,
    };
    console.log(requestAction);
    // dispatch(requestAction);
  };

  const showRequestConfirmation = () => {
    requestBooksSweetAlert(() => {
      handleSave();
    });
    handleClose();
  };

  return (
    <div>
      <CustomButton
        label="Request Paper Books"
        variant="contained"
        Icon={<LibraryBooksIcon sx={{ fontSize: "larger", ml: 1 }} />}
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={() => {}}
        aria-labelledby="request-for-paper-books"
        aria-describedby="form for users to request additional paper books"
      >
        <Box sx={style}>
          <Typography id="paper-coupon-request" variant="h6">
            Paper Coupon Request
          </Typography>
          <Divider sx={lineDivider} />
          <Typography
            id="Please enter the quantity of books you would like to request"
            sx={{ mt: 2 }}
          >
            Please enter the quantity of books you would like to request
          </Typography>
          <TextField
            label="Quantity"
            type="number"
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth
            sx={{ mb: 2, mt: 2 }}
          />
          <ModalButtons
            label="Submit"
            width="50%"
            onCancel={handleClose}
            onSave={showRequestConfirmation}
          />
        </Box>
      </Modal>
    </div>
  );
}
