import React from "react";
import { Typography as MuiTypography } from "@mui/material";

const Typography = ({ label, sx, variant, gutterBottom }) => {
  return (
    <MuiTypography
      sx={sx}
      variant={variant}
      gutterBottom={gutterBottom}
    >
      {label}
    </MuiTypography>
  );
};

export default Typography;
