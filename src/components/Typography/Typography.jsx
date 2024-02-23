import React from "react";
import { Typography as MuiTypography } from "@mui/material";
import { Link } from "react-router-dom";

const Typography = ({ label, sx, variant, gutterBottom, to, newTab }) => {
  if (to) {
    return (
      <MuiTypography
        component={Link}
        to={to}
        target={newTab ? "_blank" : ""}
        sx={sx}
        variant={variant}
        gutterBottom={gutterBottom}
      >
        {label}
      </MuiTypography>
    );
  }

  return (
    <MuiTypography sx={sx} variant={variant} gutterBottom={gutterBottom}>
      {label}
    </MuiTypography>
  );
};

export default Typography;
