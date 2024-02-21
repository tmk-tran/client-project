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

module.exports = router;