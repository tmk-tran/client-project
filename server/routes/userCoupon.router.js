const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/:id", rejectUnauthenticated, (req, res) => {
  const userId = req.params.id;  

  const queryText = `
            SELECT *
            FROM user_coupon
            WHERE user_id = $1
            AND redeemed = false;
        `;

  pool
    .query(queryText, [userId])
    .then((result) => {
      console.log("FROM userCoupon.router: ", result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error in the GET / request for user coupons", error);
      res.sendStatus(500);
    });
});

module.exports = router;
