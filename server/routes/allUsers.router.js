const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

//New user query with Devii api call
// router.post("/", (req, res) => {
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = "{\r\n    user {\r\n id\r\n username\r\n password\r\n is_admin\r\n is_deleted\r\n user_group_collection{\r\n id\r\n group_id\r\n user_id\r\n group_admin\r\n}\r\n}\r\n}";

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.json())
//     .then((result) => {
//       console.log(result);
//       res.sendStatus(200)
//     })
//     .catch((error) => {
//       console.log("Error getting data from Devii", error)
//       res.sendStatus(500)
//     });
// })


// //Origional get route for users
// // router.get("/", (req, res) => {
// //   pool
// //     .query(
// //       `SELECT
// //       u.id AS user_id,
// //       u.username,
// //       jsonb_agg(
// //           JSONB_BUILD_OBJECT(
// //               'id', ug.id,
// //               'group_id', ug.group_id,
// //               'group_nickname', g.group_nickname,
// //               'group_department', g.department,
// //               'group_subdepartment', g.sub_department,
// //               'organization_name', o.organization_name,
// //               'group_admin', ug.group_admin
// //           )
// //       ) AS groups
// //   FROM
// //       "user" u
// //   LEFT JOIN
// //       "user-group" ug ON u.id = ug.user_id
// //   LEFT JOIN
// //       "group" g ON ug.group_id = g.id
// //   LEFT JOIN
// //       "organization" o ON g.organization_id = o.id
// //   WHERE
// //       u.is_deleted = false
// //   GROUP BY
// //       u.id, u.username
// //   ORDER BY
// //       u.id ASC;`
// //     )
// //     .then((response) => {
// //       res.send(response.rows).status(200);
// //     })
// //     .catch((error) => {
// //       console.log("Error in all users GET route", error);
// //       res.sendStatus(500);
// //     });
// // });

// //Might need to ask about this and how the logic works on fronnt end


// //Origional put route to add to user groups table
// // router.put('/', (req, res) => {
// //     const groups = req.body.groups; // Access the groups array

// //     const updatePromises = groups.map((group) => {
// //       const queryText = 'UPDATE "user-group" SET "group_admin" = $1 WHERE "id" = $2;';

// //       return pool.query(queryText, [group.group_admin, group.id]);
// //     });

// //     // Wait for all update queries to complete
// //     Promise.all(updatePromises)
// //       .then(() => {
// //         res.sendStatus(200);
// //       })
// //       .catch((err) => {
// //         console.log("Error in marking group admin", err);
// //         res.sendStatus(500);
// //       });
// //   });


// module.exports = router;