const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

//Get route for ALL groups
router.get("/", (req, res) => {
  const id = req.params.id;
  const queryText = `SELECT
g.id AS group_id,
g.organization_id,
o.organization_name,
g.department,
g.sub_department,
g.group_nickname,
g.group_photo,
g.group_description,
u.username,
u.is_admin, -- Add this line to select the is_admin column
json_agg(json_build_object(
    'id', f.id,
    'title', f.title,
    'start_date', f.start_date,
    'end_date', f.end_date,
    'books_requested', f.requested_book_quantity,
    'books_sold', f.books_sold,
    'closed', f.closed,
    'coupon_book_year', cb.year,
    'fundraiser_photo', f.photo
)) AS fundraisers_info
FROM
"group" g
LEFT JOIN
"fundraiser" f ON g.id = f.group_id
JOIN
"user-group" ug ON g.id = ug.group_id
JOIN
"organization" o ON g.organization_id = o.id
LEFT JOIN
"coupon_book" cb ON f.coupon_book_id = cb.id
LEFT JOIN
"user" u ON ug.user_id = u.id
WHERE
ug.user_id = $1 AND ug.group_admin = true
GROUP BY
g.id, g.organization_id, o.organization_name, g.department, g.sub_department, g.group_nickname, g.group_photo, g.group_description, u.username, u.is_admin;`;

  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error getting group details", err);
      res.sendStatus(500);
    });
});

module.exports = router;
