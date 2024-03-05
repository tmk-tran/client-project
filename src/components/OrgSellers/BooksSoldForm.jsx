import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Modal,
  Divider,
} from "@mui/material";
import { lineDivider } from "../Utils/modalStyles";
import ModalButtons from "../Modals/ModalButtons";
import { dispatchHook } from "../../hooks/useDispatch";

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

export default function BooksSoldForm({ open, handleClose }) {
  const dispatch = dispatchHook();
  const [editedAmount, setEditedAmount] = useState(0);
  console.log(editedAmount);

  const handleAmountChange = (e) => {
    setEditedAmount(e.target.value);
  };

  const handleSubmit = () => {
    console.log(editedAmount);
    const updateAction = {
      type: "UPDATE_BOOKS_SOLD",
      payload: editedAmount,
    };
    console.log("Dispatching action:", updateAction);
    dispatch(updateAction);
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Physical Books Sold
          </Typography>
          <Divider sx={lineDivider} />
          <Typography id="modal-modal-description" sx={{ mb: 2 }}>
            Please provide the total amount sold, through cash or check sales
          </Typography>
          <TextField
            label="Physical Book Sales"
            type="number"
            fullWidth
            onChange={handleAmountChange}
            sx={{ mb: 2 }}
          />
          <ModalButtons label="Update" onSave={handleSubmit} onCancel={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
