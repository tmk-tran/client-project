import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  TextField,
  Modal,
} from "@mui/material";
import { lineDivider, modalHeaderStyle } from "../Utils/modalStyles";

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

const backdropStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust the color and opacity here
};

export default function EditLocationModal({ isOpen, onClose }) {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        // BackdropProps={{ style: backdropStyle }}
      >
        <Box sx={style}>
          <Typography variant="h6" sx={modalHeaderStyle}>
            Edit Location
          </Typography>
          <Divider sx={lineDivider} />
          <Typography sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
