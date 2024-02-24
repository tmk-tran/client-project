import React from "react";
import { Button } from "@mui/material";

export default function CustomButton({
  label,
  icon,
  onClick,
  variant,
  sx,
  disabled,
  fullWidth,
}) {
  return (
    <Button
      startIcon={icon}
      variant={variant}
      onClick={onClick}
      sx={sx}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      {label}
    </Button>
  );
}
