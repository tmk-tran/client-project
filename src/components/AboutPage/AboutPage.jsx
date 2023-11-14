import React from "react";

// Styling
import { Typography } from "@mui/material";
import "./AboutPage.css";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <br />
      <div>
        <center>
          <div style={{ width: "50%" }}>
            <Typography variant="h5">About Us</Typography>
            <br />
            <Typography>
              The Preferred Savings Guide in Fargo has been in the FM and
              surrounding area since 1974. The Blue Coupon Book is very
              recognizable in our community! It's a product where a customer can
              recoup their costs in as little as redeeming three coupons.
              Organizations/Groups that sell The Preferred Savings Guide not
              only receive a quality product with offerings from over 100+
              merchants but they also receive marketing for their
              organization/groups through our social media and additional
              selling materials available for their group.
            </Typography>

            <div className="about-paragraph-bottom">
              <Typography style={{ fontWeight: "bold" }}>
                Book sales will start September 8th, 2023
              </Typography>

              <Typography>Fargo/Moorhead Coupon Book</Typography>

              <Typography>All sales are final</Typography>
              <br />
              <Typography>
                For billing, contact: &nbsp;
                <a href="mailto:preferredsavings@gmail.com">
                  preferredsavings@gmail.com
                </a>
              </Typography>
            </div>
          </div>
        </center>
      </div>
    </div>
  );
}

export default AboutPage;
