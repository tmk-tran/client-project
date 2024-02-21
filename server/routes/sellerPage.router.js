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

  const queryText = `
          UPDATE 
            "sellers"
          SET
            "cash" = "cash" + $1
          WHERE 
            "id" = $2;`;

  const values = [sellerInfo.cash, sellerId];

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

module.exports = router;
