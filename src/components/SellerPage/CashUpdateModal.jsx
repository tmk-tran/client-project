import React, { useState } from "react";
import { Box, Button, Typography, Modal, TextField } from "@mui/material";
import ModalButtons from "../Modals/ModalButtons";

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

export default function CashUpdateModal({ updateCash }) {
  const [open, setOpen] = useState(false);
  const [cashAmount, setCashAmount] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCashAmountChange = (event) => {
    setCashAmount(event.target.value);
  };

  const resetForm = () => {
    setCashAmount(0);
    handleClose();
  };

  const handleSubmit = () => {
    console.log("Cash amount submitted:", cashAmount);
    updateCash(cashAmount); // Pass to parent component
    resetForm();
    handleClose(); // Close the modal after submission
  };

  return (
    <div>
      <Button variant="contained" sx={{ mt: 3 }} onClick={handleOpen}>
        Update Cash
      </Button>
      <Modal open={open} onClose={() => {}}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cash Collected
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please enter the amount of cash collected for coupon book sale
          </Typography>
          <TextField
            type="number"
            inputProps={{ min: "0" }}
            label="Cash Amount"
            variant="outlined"
            value={cashAmount}
            onChange={handleCashAmountChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <ModalButtons
            label="Submit"
            width="50%"
            sx={{ mt: 3 }}
            onSave={handleSubmit}
            onCancel={resetForm}
          />
        </Box>
      </Modal>
    </div>
  );
}
