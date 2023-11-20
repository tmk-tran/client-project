const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/:id", rejectUnauthenticated, (req, res) => {
  const orgId = req.params.id;
  const queryText = `SELECT * FROM "organization" WHERE id = $1;`;
  pool
    .query(queryText, [orgId])
    .then((result) => {
      // console.log("orgId = ", orgId);
      console.log("FROM orgNotes.router: ", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in the GET / request for authorized users", err);
      res.sendStatus(500);
    });
});

// POST ROUTE
router.post("/", rejectUnauthenticated, (req, res) => {
  const note = req.body;
  //   console.log(req.body);
  //   console.log(req.user);
  const queryText = `INSERT INTO "organization_notes" ("organization_id", "user_id", "note_date", "note_content")
  VALUES $1, $2, $3, $4;`;

  pool
    .query(queryText, [
      note.organization_id,
      note.user_id,
      note.note_date,
      note.note_content,
    ])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error in orgNotes POST route", err);
      res.sendStatus(500);
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  pool
    .query(`UPDATE "organization_notes" SET is_deleted = true WHERE id = $1;`, [
      req.params.id,
    ])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error with orgNotes DELETE route", error);
      res.sendStatus(500);
    });
});

// EDIT
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const note = req.body;

  const orgId = note.organization_id;
  const user = req.user.id;
  const date = note.note_date;
  const content = note.note_content;

  const queryText = `
  UPDATE "organization_notes"
  SET
    organization_id = $1,
    user_id = $2,
    note_date = $3,
    note_content = $4,
  WHERE
    "id" = $5;
  `;
  pool
    .query(queryText, [orgId, user, date, content])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error with orgNotes PUT route", err);
      res.sendStatus(500);
    });
});

module.exports = router;
