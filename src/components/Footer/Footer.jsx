import React from "react";
import { Typography } from "@mui/material";
import LinksSocial from "../LinksSocial/LinksSocial";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div style={{ textAlign: "left", flexGrow: "1" }}>
          <Typography variant="body2">
            COPYRIGHT © 2023 THE PREFERRED SAVINGS GUIDE <br /> - ALL RIGHTS
            RESERVED.
          </Typography>
        </div>
        <div className="center-icon-container">
          <div className="center-icon">
            <LinksSocial />
          </div>
        </div>
        <div style={{ textAlign: "right", flexGrow: "1" }}>
          <Typography>ALL SALES ARE FINAL</Typography>
        </div>
      </div>
    </footer>
  );
}
