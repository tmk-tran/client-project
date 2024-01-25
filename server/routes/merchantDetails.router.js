const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/:id", (req, res) => {
  const merchantId = req.params.id;

  const queryText = `SELECT * FROM merchant WHERE id = $1;`;
  pool
    .query(queryText, [merchantId])
    .then((result) => {
      console.log("FROM merchantDetails.router: ", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in the GET / request for authorized users", err);
      res.sendStatus(500);
    });
});

module.exports = router;
