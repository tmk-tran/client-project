import React from "react";
import { Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import "./LinksSocial.css";

export default function LinksSocial() {
  return (
    <center>
    <div className="links-social">
      <FacebookIcon style={{ color: "#1877f2" }} />
      <InstagramIcon style={{ color: "#E4405F" }} />
      <LinkedInIcon style={{ color: "#0077B5" }} />
      <TwitterIcon style={{ color: "#1DA1F2" }} />
    </div>
    </center>
  );
}
