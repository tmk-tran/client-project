const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  pool
    .query(
      `SELECT
      u.id,
      u.username,
      u.is_admin,
      ug.id AS user_group_id,
      ug.group_id,
      ug.group_admin,
      g.id AS group_id,
      g.organization_id,
      g.department,
      g.sub_department,
      g.group_nickname,
      o.organization_name
  FROM
      "user" u
  LEFT JOIN
      "user-group" ug ON u.id = ug.user_id
  LEFT JOIN
      "group" g ON ug.group_id = g.id
  LEFT JOIN
      "organization" o ON g.organization_id = o.id
  WHERE
      g.is_deleted = false
      AND o.is_deleted = false;`
    )
    .then((response) => {
      res.send(response.rows).status(200);
    })
    .catch((error) => {
      console.log("Error in organizations GET route", error);
      res.sendStatus(500);
    });
});


module.exports = router;