import React from "react";
import { Typography as MuiTypography } from "@mui/material";

const Typography = ({ label, sx, variant, gutterBottom, ...rest }) => {
  return (
    <MuiTypography
      sx={sx}
      variant={variant}
      gutterBottom={gutterBottom}
      {...rest}
    >
      {label}
    </MuiTypography>
  );
};

export default Typography;
