import React from "react";
import { Typography } from "@mui/material";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <Typography variant="h6">Footer</Typography>
      <div className="footer-container">
        <Typography>
          COPYRIGHT © 2023 THE PREFERRED SAVINGS GUIDE - ALL RIGHTS RESERVED.
        </Typography>
        <div>links social</div>
        <Typography>ALL SALES ARE FINAL</Typography>
      </div>
    </footer>
  );
}
