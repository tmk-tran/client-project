import React from "react";
import { Button } from "@mui/material";

export default function CustomButton({
  label,
  icon,
  onClick,
  variant,
  sx,
  disabled,
}) {
  return (
    <Button
      startIcon={icon}
      variant={variant}
      onClick={onClick}
      sx={sx}
      disabled={disabled}
    >
      {label}
    </Button>
  );
}
