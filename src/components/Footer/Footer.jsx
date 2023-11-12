import React from "react";
import { Typography } from "@mui/material";
import LinksSocial from "../LinksSocial/LinksSocial";

import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <Typography>
          COPYRIGHT © 2023 THE PREFERRED SAVINGS GUIDE <br /> - ALL RIGHTS
          RESERVED.
        </Typography>
        <LinksSocial />
        <Typography>ALL SALES ARE FINAL</Typography>
      </div>
    </footer>
  );
}
