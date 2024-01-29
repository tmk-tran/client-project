const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/:id", rejectUnauthenticated, (req, res) => {
  const merchantId = req.params.id;
  console.log("merchantId = ", merchantId);
  const queryText = `
  SELECT * 
  FROM "merchant_comments" 
  WHERE merchant_id = $1 
  ORDER BY CONCAT("date", ' ', "time") DESC, "id" DESC;
`;
  pool
    .query(queryText, [merchantId])
    .then((result) => {
      // console.log("merchantId = ", merchantId);
      console.log("FROM merchantComments.router: ", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in the GET / request for authorized users", err);
      res.sendStatus(500);
    });
});

router.post("/", rejectUnauthenticated, (req, res) => {
  const comment = req.body;
  console.log(comment);
  const merchantId = comment.merchant_id;
  const date = comment.comment_date;
  const content = comment.comment_content;

  const queryText = `INSERT INTO "merchant_comments" ("merchant_id", "date", "time", "comment_content", "user")
                                                        VALUES ($1, $2, $3, $4, $5);`;

  pool
    .query(queryText, [merchantId, date, content])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error in merchantComments POST route", err);
      res.sendStatus(500);
    });
});

module.exports = router;
