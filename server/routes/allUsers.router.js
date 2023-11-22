const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  pool
    .query(
      `SELECT
      u.id AS user_id,
      u.username,
      jsonb_agg(
          JSONB_BUILD_OBJECT(
              'id', ug.id,
              'group_id', ug.group_id,
              'group_nickname', g.group_nickname,
              'group_department', g.department,
              'group_subdepartment', g.sub_department,
              'organization_name', o.organization_name,
              'group_admin', ug.group_admin
          )
      ) AS groups
  FROM
      "user" u
  LEFT JOIN
      "user-group" ug ON u.id = ug.user_id
  LEFT JOIN
      "group" g ON ug.group_id = g.id
  LEFT JOIN
      "organization" o ON g.organization_id = o.id
  WHERE
      u.is_deleted = false
  GROUP BY
      u.id, u.username
  ORDER BY
      u.id ASC;`
    )
    .then((response) => {
      res.send(response.rows).status(200);
    })
    .catch((error) => {
      console.log("Error in all users GET route", error);
      res.sendStatus(500);
    });
});

router.put('/', (req, res) => {
    const groups = req.body.groups; // Access the groups array
  
    const updatePromises = groups.map((group) => {
      const queryText = 'UPDATE "user-group" SET "group_admin" = $1 WHERE "id" = $2;';
  
      return pool.query(queryText, [group.group_admin, group.id]);
    });
  
    // Wait for all update queries to complete
    Promise.all(updatePromises)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log("Error in marking group admin", err);
        res.sendStatus(500);
      });
  });


module.exports = router;