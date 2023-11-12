import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import "./LinksSocial.css";

export default function LinksSocial() {
  return (
    <div className="links-social">
      <FacebookIcon id="fb-icon" style={{ color: "#1877f2" }} />
      <InstagramIcon id="ig-icon" style={{ color: "#E4405F" }} />
      <LinkedInIcon id="li-icon" style={{ color: "#0077B5" }} />
      <TwitterIcon id="x-icon" style={{ color: "#1DA1F2" }} />
    </div>
  );
}
