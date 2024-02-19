const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/:id", rejectUnauthenticated, (req, res) => {
  const orgId = req.params.id;

  const queryText = `
    SELECT
      *
    FROM
      sellers
    WHERE
      organization_id = $1;`;

  pool
    .query(queryText, [orgId])
    .then((result) => {
      console.log("from GET /id sellers.router: ", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in the GET / request for sellers", err);
      res.sendStatus(500);
    });
});

router.post("/", rejectUnauthenticated, (req, res) => {
  const data = req.body;
  console.log(req.body);
  console.log(req.user);

  const refId = data.refId;
  const lastName = data.lastname;
  const firstName = data.firstname;
  const level = data.level;
  const teacher = data.teacher;
  const initialBooks = data.initial_books;
  const additionalBooks = data.additional_books;
  const booksReturned = data.books_returned;
  const cash = data.cash;
  const checks = data.checks;
  const digital = data.digital;
  const donations = data.donations;
  const notes = data.notes;
  const organizationId = data.organization_id;

  const queryText = `
        INSERT INTO "sellers" (
          "refId",
          "lastname",
          "firstname",
          "level",
          "teacher",
          "initial_books",
          "additional_books",
          "books_returned",
          "cash",
          "checks",
          "digital",
          "donations",
          "notes",
          "organization_id"
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`;

  pool
    .query(queryText, [
      refId,
      lastName,
      firstName,
      level,
      teacher,
      initialBooks,
      additionalBooks,
      booksReturned,
      cash,
      checks,
      digital,
      donations,
      notes,
      organizationId,
    ])
    .then((response) => {
      console.log("response from POST sellers.router: ", response.rows);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error in sellers POST route", err);
      res.sendStatus(500);
    });
});

module.exports = router;
