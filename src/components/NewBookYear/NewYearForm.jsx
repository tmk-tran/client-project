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
// ~~~~~~~~~~ Components ~~~~~~~~~~ //
import ModalButtons from "../Modals/ModalButtons";
import { showSaveSweetAlert } from "../Utils/sweetAlerts";

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

export default function NewYearForm() {
  const dispatch = dispatchHook();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const startNewYear = () => {
    const dispatchAction = {
      type: "ADD_COUPON_BOOK",
      payload: {},
    };
    console.log(dispatchAction);
    dispatch(dispatchAction);
    handleClose();
    showSaveSweetAlert({ label: "New Book Year Added" });
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Start
      </Button>
      <Modal
        open={open}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Start a new coupon book year?
          </Typography>
          <ModalButtons
            label="Confirm"
            onSave={startNewYear}
            onCancel={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
}
