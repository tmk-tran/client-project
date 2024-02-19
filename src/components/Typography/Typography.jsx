import React from "react";
import { Typography as MuiTypography } from "@mui/material";

const Typography = ({ label, sx, variant, ...rest }) => {
  return (
    <MuiTypography sx={sx} variant={variant} {...rest}>
      {label}
    </MuiTypography>
  );
};

export default Typography;
