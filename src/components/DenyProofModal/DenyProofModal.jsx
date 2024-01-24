import * as React from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import DenyProofForm from "./DenyProofForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ onClose }) {
  return (
    <div>
      <Modal
        open={true}
        // onClose={onClose} // Locks the modal until user clicks cancel or close button
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <DenyProofForm onClose={onClose} />

        </Box>
      </Modal>
    </div>
  );
}
