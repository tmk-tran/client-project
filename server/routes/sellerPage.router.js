const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:refId", (req, res) => {
  console.log("from GET /id seller.router: ", req.params.refId);
  const refId = req.params.refId;

  const queryText = `
      SELECT
        *
      FROM
        sellers
      WHERE
        "refId" = $1    
      ;`;

  pool
    .query(queryText, [refId])
    .then((result) => {
      console.log("from GET /id seller.router: ", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in the GET / request for sellers", err);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  const sellerId = req.params.id;
  const sellerInfo = req.body;
  const updateType = sellerInfo.updateType;
  const refId = sellerInfo.refId;

  let queryText;
  let values;

  switch (updateType) {
    case "cash":
      queryText = `
            UPDATE 
              "sellers"
            SET
              "cash" = "cash" + $1
            WHERE 
              "id" = $2
            AND
              "refId" = $3
            ;`;
      values = [sellerInfo.cash, sellerId, refId];
      break;
    case "checks":
      queryText = `
            UPDATE 
              "sellers"
            SET
              "checks" = "checks" + $1
            WHERE 
              "id" = $2
            AND
              "refId" = $3
            ;`;
      values = [sellerInfo.checks, sellerId, refId];
      break;
    case "donations":
      queryText = `
          UPDATE 
            "sellers"
          SET
            "donations" = "donations" + $1
          WHERE 
            "id" = $2
          AND
            "refId" = $3
          ;`;
      values = [sellerInfo.donations, sellerId, refId];
      break;
    default:
      res.status(400).json({ error: "Invalid update type" });
      return;
  }

  pool
    .query(queryText, values)
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error with sellerPage PUT route", err);
      res.sendStatus(500);
    });
});

module.exports = router;
