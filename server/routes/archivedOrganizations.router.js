const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// router.get("/", (req, res) => {
//     const ACCESS_TOKEN = auth_response.access_token;
//   
//     //     pool
//     //         .query(
//     //             `SELECT
//     //       o.*,
//     //       COALESCE(group_count.total_groups, 0) AS total_groups,
//     //       COALESCE(fundraiser_count.total_fundraisers, 0) AS total_fundraisers,
//     //       COALESCE(closed_fundraiser_count.total_closed_fundraisers, 0) AS total_closed_fundraisers,
//     //       (COALESCE(fundraiser_count.total_fundraisers, 0) - COALESCE(closed_fundraiser_count.total_closed_fundraisers, 0)) AS total_active_fundraisers,
//     //       COALESCE(total_books_sold.total_books_sold, 0) AS total_books_sold,
//     //       COALESCE(total_outstanding_balance.total_outstanding_balance, 0) AS total_outstanding_balance,
//     //       COALESCE(total_books_sold.total_books_sold, 0) * COALESCE(o.organization_earnings, 0) AS total_org_earnings,
//     //       COALESCE(total_checked_out_books.total_checked_out_books, 0) AS total_checked_out_books,
//     //       COALESCE(total_checked_in_books.total_checked_in_books, 0) AS total_checked_in_books
//     //   FROM
//     //       organization o
//     //   LEFT JOIN (
//     //       SELECT
//     //           organization_id,
//     //           COUNT(id) AS total_groups
//     //       FROM
//     //           "group"
//     //       WHERE
//     //           is_deleted = false
//     //       GROUP BY
//     //           organization_id
//     //   ) AS group_count ON o.id = group_count.organization_id
//     //   LEFT JOIN (
//     //       SELECT
//     //           g.organization_id,
//     //           COUNT(f.id) AS total_fundraisers
//     //       FROM
//     //           "group" g
//     //       LEFT JOIN
//     //           fundraiser f ON g.id = f.group_id
//     //       WHERE
//     //           g.is_deleted = false AND f.is_deleted = false
//     //       GROUP BY
//     //           g.organization_id
//     //   ) AS fundraiser_count ON o.id = fundraiser_count.organization_id
//     //   LEFT JOIN (
//     //       SELECT
//     //           g.organization_id,
//     //           COUNT(f.id) AS total_closed_fundraisers
//     //       FROM
//     //           "group" g
//     //       LEFT JOIN
//     //           fundraiser f ON g.id = f.group_id
//     //       WHERE
//     //           g.is_deleted = false AND f.is_deleted = false AND f.closed = true
//     //       GROUP BY
//     //           g.organization_id
//     //   ) AS closed_fundraiser_count ON o.id = closed_fundraiser_count.organization_id
//     //   LEFT JOIN (
//     //       SELECT
//     //           g.organization_id,
//     //           SUM(f.books_sold) AS total_books_sold
//     //       FROM
//     //           "group" g
//     //       LEFT JOIN
//     //           fundraiser f ON g.id = f.group_id
//     //       WHERE
//     //           g.is_deleted = false AND f.is_deleted = false
//     //       GROUP BY
//     //           g.organization_id
//     //   ) AS total_books_sold ON o.id = total_books_sold.organization_id
//     //   LEFT JOIN (
//     //       SELECT
//     //           g.organization_id,
//     //           SUM(f.outstanding_balance) AS total_outstanding_balance
//     //       FROM
//     //           "group" g
//     //       LEFT JOIN
//     //           fundraiser f ON g.id = f.group_id
//     //       WHERE
//     //           g.is_deleted = false AND f.is_deleted = false
//     //       GROUP BY
//     //           g.organization_id
//     //   ) AS total_outstanding_balance ON o.id = total_outstanding_balance.organization_id
//     //   LEFT JOIN (
//     //       SELECT
//     //           g.organization_id,
//     //           SUM(f.book_quantity_checked_out) AS total_checked_out_books
//     //       FROM
//     //           "group" g
//     //       LEFT JOIN
//     //           fundraiser f ON g.id = f.group_id
//     //       WHERE
//     //           g.is_deleted = false AND f.is_deleted = false
//     //       GROUP BY
//     //           g.organization_id
//     //   ) AS total_checked_out_books ON o.id = total_checked_out_books.organization_id
//     //   LEFT JOIN (
//     //       SELECT
//     //           g.organization_id,
//     //           COALESCE(SUM(f.book_quantity_checked_in), 0) AS total_checked_in_books
//     //       FROM
//     //           "group" g
//     //       LEFT JOIN
//     //           fundraiser f ON g.id = f.group_id
//     //       WHERE
//     //           g.is_deleted = false AND f.is_deleted = false
//     //       GROUP BY
//     //           g.organization_id
//     //   ) AS total_checked_in_books ON o.id = total_checked_in_books.organization_id
//     //   WHERE
//     //       o.is_deleted = true
//     //   ORDER BY
//     //       o.organization_name ASC;`
//     //         )
//     //         .then((response) => {
//     //             res.send(response.rows).status(200);
//     //         })
//     //         .catch((error) => {
//     //             console.log("Error in archived Organizations GET route", error);
//     //             res.sendStatus(500);
//     //         });
// });


// // Can be used to update an archived organization
// 
// // router.put("/:id", (req, res) => {
// //   const organization = req.body;
// //   const queryText = `
// //   UPDATE "organization" 
// //   SET "organization_name" = $1, "type" = $2, "address" = $3,
// //       "city" = $4,
// //       "state" = $5,
// //       "zip" = $6,
// //       "primary_contact_first_name" = $7,
// //       "primary_contact_last_name" = $8,
// //       "primary_contact_phone" = $9,
// //       "primary_contact_email" = $10,
// //       "organization_logo" = $11
// //   WHERE "id" = $12;`;
// //   pool
// //     .query(queryText, [
// //       organization.organization_name,
// //       organization.type,
// //       organization.address,
// //       organization.city,
// //       organization.state,
// //       organization.zip,
// //       organization.primary_contact_first_name,
// //       organization.primary_contact_last_name,
// //       organization.primary_contact_phone,
// //       organization.primary_contact_email,
// //       organization.organization_logo,
// //       req.params.id,
// //     ])
// //     .then((response) => {
// //       res.sendStatus(200);
// //     })
// //     .catch((err) => {
// //       console.log("error with organizations PUT route", err);
// //       res.sendStatus(500);
// //     });
// // });

// module.exports = router;
