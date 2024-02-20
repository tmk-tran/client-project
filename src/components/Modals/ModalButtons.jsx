import { Button } from "@mui/material";
import { modalBtnStyle, saveBtnWidth } from "../Utils/helpers";

export default function ModalButtons({
  label,
  editedAccount,
  onSave,
  onCancel,
  sx,
  width,
}) {
  console.log(editedAccount);
  const buttonSx = {
    width: width === "50%" ? "50%" : "auto",
    ...sx,
  };

  const handleSave = () => {
    onSave(editedAccount);
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
        onClick={handleSave}
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
