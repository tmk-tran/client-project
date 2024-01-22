const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/:id", rejectUnauthenticated, (req, res) => {
  const merchantId = req.params.id;
  console.log("merchantId = ", merchantId);
  const queryText = `SELECT * FROM "merchant_notes" WHERE merchant_id = $1 ORDER by "id" DESC;`;
  pool
    .query(queryText, [merchantId])
    .then((result) => {
      // console.log("merchantId = ", merchantId);
      console.log("FROM merchantNotes.router: ", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in the GET / request for authorized users", err);
      res.sendStatus(500);
    });
});

module.exports = router;
