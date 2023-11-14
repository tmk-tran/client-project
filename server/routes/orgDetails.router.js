const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * Get all of the details for an organization
 */
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const orgId = req.params.id;
  const queryText = `
      SELECT
          o.id AS organization_id,
          o.organization_name,
          o.type,
          o.address,
          o.city,
          o.state,
          o.zip,
          o.primary_contact_first_name,
          o.primary_contact_last_name,
          o.primary_contact_phone,
          o.primary_contact_email,
          o.organization_logo,
          g.id AS group_id,
          g.department,
          g.sub_department,
          g.group_nickname,
          g.group_photo,
          g.group_description
      FROM
          "organization" o
      JOIN
          "group" g ON o.id = g.organization_id
      WHERE
          o.id = $1 AND
          o.is_deleted = false AND
          g.is_deleted = false;
  `;
  pool
    .query(queryText, [orgId])
    .then((result) => {
      // console.log("orgId = ", orgId);
      // console.log("FROM orgDetails.router: ", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in the GET / request for authorized users", err);
      res.sendStatus(500);
    });
});

/**
 * Add a game for the logged in user
 */
// router.post("/", rejectUnauthenticated, (req, res) => {
//   const item = req.body;
//   const user = req.user;
//   const queryText = ``;
//   pool
//     .query(queryText, [
//       user.user_id,

//     ])
//     .then((result) => {
//       const newGameId = result.rows[0].game_id;
//       console.log("new game_id: ", newGameId);
//       res.send({ game_id: newGameId }).status(201);
//       // .json({ message: "Values inserted!", game_id: newGameId });
//     })
//     .catch((error) => {
//       console.log("Error in POST: ", error);
//       res.sendStatus(500);
//     });
// });

/**
 * Delete a game if it's one the logged in user added
 */
// router.delete("/:id", rejectUnauthenticated, (req, res) => {
//   // endpoint functionality
//   console.log("REQ: ", req.params.id);
//   console.log("USER: ", req.user.user_id);
//   pool
//     .query(`DELETE FROM "games" WHERE "game_id" = $1 AND "user_id" = $2`, [
//       req.params.id,
//       req.user.user_id,
//     ])
//     .then((results) => {
//       res.sendStatus(200);
//     })
//     .catch((error) => {
//       console.log("Error in DELETE with id", error);
//       res.sendStatus(500);
//     });
// });

/**
 * Update a group
 */
router.put("/:id", (req, res) => {
  const organization = req.body;
  console.log("ORGANIZATION = ", organization);
  const firstName = organization.primary_contact_first_name;
  const lastName = organization.primary_contact_last_name;
  const phone = organization.primary_contact_phone;
  const email = organization.primary_contact_email;
  const orgId = organization.organization_id;
  const user = req.user.id;
  const queryText = `UPDATE "organization" SET primary_contact_first_name = $1, primary_contact_last_name = $2, primary_contact_phone = $3, primary_contact_email = $4 WHERE id = $5;`;
  pool
    .query(queryText, [
      firstName,
      lastName,
      phone,
      email,
      orgId,
    ])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error saving to database", err);
      res.sendStatus(500);
    });
});

module.exports = router;
