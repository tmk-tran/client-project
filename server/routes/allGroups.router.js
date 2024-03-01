const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//New post route to Devii api to get all groups
// router.post('/', (req, res) => {
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = "{\r\n  group{\r\n id\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_photo\r\n group_description\r\n is_deleted\r\n }\r\n}";

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
//       console.log(result.data.group);
//       res.sendStatus(200)
//     })
//     .catch((error) => {
//       console.log("Error getting data from Devii", error)
//       res.sendStatus(500)
//     });
// });


// //Old get route for all groups
// //Get route for ALL groups
// // router.get('/', (req, res) => {
// //   const id = req.params.id
// // const queryText = `SELECT * FROM "group";`;

// // pool.query(queryText)
// // .then(result => {
// //   res.send(result.rows);
// // })
// // .catch(err =>{
// //   console.log("Error getting group details", err);
// //   res.sendStatus(500)
// // })
// // });


// module.exports = router;