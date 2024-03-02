const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT 
      *
    FROM
      customers
    ORDER BY
      last_name ASC;
    `;

  pool
    .query(queryText)
    .then((result) => {
      console.log("from GET ALL customers.router: ", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in the GET / request for customers", err);
      res.sendStatus(500);
    });
});

router.post("/", rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  const customer = req.body;
  const refId = customer.refId;
  const lastName = customer.last_name;
  const firstName = customer.first_name;
  const phone = customer.phone;

  const queryText = `
        INSERT INTO "customers" (
          "refId",
          "last_name",
          "first_name",
          "phone"
        )
        VALUES ($1, $2, $3, $4);
        `;

  pool
    .query(queryText, [refId, lastName, firstName, phone])
    .then((response) => {
      console.log("response from POST customers.router: ", response.rows);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error in customers POST route", err);
      res.sendStatus(500);
    });
});

module.exports = router;
