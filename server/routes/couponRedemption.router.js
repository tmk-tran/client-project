const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.post("/", rejectUnauthenticated, (req, res) => {
  const coupon = req.body;
  console.log("from couponRedemption.router: ", coupon);
  const couponId = coupon.couponId;
  const locationId = coupon.locationId;
  const redeemedBy = coupon.userId;

  const queryText = `
        INSERT INTO 
            coupon_redemption (
                coupon_id, 
                location_id, 
                redeemed_by)
        VALUES ($1, $2, $3);
    
    `;

  pool
    .query(queryText, [couponId, locationId, redeemedBy])
    .then((response) => {
      console.log("response from couponRedemption.router: ", response.rows);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error in locations POST couponRedemption route", err);
      res.sendStatus(500);
    });
});

module.exports = router;
