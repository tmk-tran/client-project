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
  const sellerInfo = req.body;
  const sellerId = req.params.id;
  console.log("Req.body from sellers = ", sellerInfo);
  const refId = sellerInfo.refId;
  console.log("refId from sellers = ", refId);

  const queryText = `
          UPDATE 
            "sellers"
          SET
            "cash" = "cash" + $1
          WHERE 
            "id" = $2
          AND
            "refId" = $3
          ;`;

  const values = [sellerInfo.cash, sellerId, refId];

  pool
    .query(queryText, values)
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error with sellerPage PUT route", err);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  const sellerId = req.params.id;
  const { updateType, sellerInfo } = req.body;
  const refId = sellerInfo.refId;

  // Check the updateType and perform the corresponding update
  switch (updateType) {
    case "cash":
      const cashQuery = `
          UPDATE 
            "sellers"
          SET
            "cash" = "cash" + $1
          WHERE 
            "id" = $2
          AND
            "refId" = $3
          ;`;

      const cashValues = [sellerInfo.cash, sellerId, refId];

      pool
        .query(cashQuery, cashValues)
        .then((response) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log("error with sellerPage PUT route", err);
          res.sendStatus(500);
        });
      break;
    case "checks":
      // Update checks logic
      break;
    case "donations":
      // Update donations logic
      break;
    default:
      res.status(400).json({ error: "Invalid update type" });
      return;
  }

  // Send a success response
  res.status(200).json({ message: `Successfully updated ${updateType}` });
});

module.exports = router;
