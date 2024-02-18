import React from "react";
import { Button } from "@mui/material";

export default function CustomButton({ label, onClick, variant, sx }) {
  return (
    <Button variant={variant} onClick={onClick} sx={sx}>
      {label}
    </Button>
  );
}
