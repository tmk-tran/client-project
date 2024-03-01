const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * Get all of the details for an organization
 */

  //   const queryText = `SELECT
  // o.id AS organization_id,
  // o.organization_name,
  // o.type,
  // o.address,
  // o.city,
  // o.state,
  // o.zip,
  // o.primary_contact_first_name,
  // o.primary_contact_last_name,
  // o.primary_contact_phone,
  // o.primary_contact_email,
  // o.organization_logo,
  // o.organization_earnings,
  // g.id AS group_id,
  // g.department,
  // g.sub_department,
  // g.group_nickname,
  // g.group_photo,
  // g.group_description,
  // SUM(f.goal)
  // FROM
  // "organization" o
  // LEFT JOIN
  // "group" g ON o.id = g.organization_id
  // LEFT JOIN
  // "fundraiser" AS f ON f.group_id = g.id
  // WHERE
  // o.id = $1 AND
  // o.is_deleted = false AND
  // (g.is_deleted = false OR g.is_deleted IS NULL)
  // GROUP BY
  // o.id, g.id, f.group_id
  // ORDER BY LOWER (g.group_nickname) ASC;`;
  //   pool
  //     .query(queryText, [orgId])
  //     .then((result) => {
  //       // console.log("orgId = ", orgId);
  //       console.log("FROM orgDetails.router: ", result.rows);
  //       res.send(result.rows);
  //     })
  //     .catch((err) => {
  //       console.log("error in the GET / request for authorized users", err);
  //       res.sendStatus(500);
  //     });


/**
 * Update an organization
 */


  // // const user = req.user.id;
  // const queryText = `UPDATE "organization" SET organization_name = $1, type = $2, address = $3, city = $4, state = $5, zip = $6, primary_contact_first_name = $7, primary_contact_last_name = $8, primary_contact_phone = $9, primary_contact_email = $10 WHERE id = $11;`;
  // pool
  //   .query(queryText, [
  //     orgName,
  //     type,
  //     address,
  //     city,
  //     state,
  //     zip,
  //     firstName,
  //     lastName,
  //     phone,
  //     email,
  //     orgId,
  //   ])
  //   .then((response) => {
  //     res.sendStatus(200);
  //   })
  //   .catch((err) => {
  //     console.log("error saving to database", err);
  //     res.sendStatus(500);
  //   });


module.exports = router;
