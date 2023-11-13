const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  pool
    .query(
      'SELECT * from "organization" WHERE "is_deleted" = false ORDER by "organization_name" ASC;'
    )
    .then((response) => {
      res.send(response.rows).status(200);
    })
    .catch((error) => {
      console.log("Error in organizations GET route", error);
      res.sendStatus(500);
    });
});

// POST ROUTE
router.post("/", (req, res) => {
  const organization = req.body;
  console.log(req.body);
  console.log(req.user);
  const queryText = `
      INSERT INTO "organization" (
        "organization_name",
        "type",
        "address",
        "city",
        "state",
        "zip",
        "primary_contact_first_name",
        "primary_contact_last_name",
        "primary_contact_phone",
        "primary_contact_email",
        "organization_logo"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;

  pool
    .query(queryText, [
      organization.organization_name,
      organization.type,
      organization.address,
      organization.city,
      organization.state,
      organization.zip,
      organization.primary_contact_first_name,
      organization.primary_contact_last_name,
      organization.primary_contact_phone,
      organization.primary_contact_email,
      organization.organization_logo,
    ])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error in organizations POST route", err);
      res.sendStatus(500);
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  pool
    .query(`UPDATE "organization" SET is_deleted = true WHERE id = $1;`, [
      req.params.id,
    ])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error with organizations DELETE route", error);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  const organization = req.body;
  const queryText = `
  UPDATE "organization" 
  SET "organization_name" = $1, "type" = $2, "address" = $3,
      "city" = $4,
      "state" = $5,
      "zip" = $6,
      "primary_contact_first_name" = $7,
      "primary_contact_last_name" = $8,
      "primary_contact_phone" = $9,
      "primary_contact_email" = $10,
      "organization_logo" = $11
  WHERE "id" = $12;`;
  pool
    .query(queryText, [
      organization.organization_name,
      organization.type,
      organization.address,
      organization.city,
      organization.state,
      organization.zip,
      organization.primary_contact_first_name,
      organization.primary_contact_last_name,
      organization.primary_contact_phone,
      organization.primary_contact_email,
      organization.organization_logo,
      req.params.id,
    ])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error with organizations PUT route", err);
      res.sendStatus(500);
    });
});

module.exports = router;
