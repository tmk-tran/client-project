import React from "react";
import { Button } from "@mui/material";

export default function CustomButton({ label, onClick, variant, sx, disabled }) {
  return (
    <Button variant={variant} onClick={onClick} sx={sx} disabled={disabled} >
      {label}
    </Button>
  );
}
