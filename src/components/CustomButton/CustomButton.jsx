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
  Icon,
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
      {label}{Icon && Icon}
    </Button>
  );
}
