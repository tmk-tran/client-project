import { Button } from "@mui/material";
import { modalBtnStyle, saveBtnWidth } from "../Utils/helpers";

export default function ModalButtons({ label, onSave, onCancel, width }) {
  const buttonSx = {
    width: width === "50%" ? "50%" : "auto",
  };

  return (
    <div style={modalBtnStyle}>
      <Button
        className="modal-cancel-btn"
        onClick={onCancel}
        sx={{ marginRight: "10px" }}
      >
        Cancel
      </Button>
      <Button
        onClick={onSave}
        variant="contained"
        color="secondary"
        // sx={saveBtnWidth}
        sx={width === "50%" ? { ...saveBtnWidth, ...buttonSx } : saveBtnWidth}
      >
        {label}
      </Button>
    </div>
  );
}
