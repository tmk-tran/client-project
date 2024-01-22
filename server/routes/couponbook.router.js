const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//New post route to fetch coupon book data from with Devii api
router.post("/", (req, res) => {
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = "{\r\n coupon_book{\r\n id\r\n year\r\n}\r\n}";

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
  myHeaders.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    query: query,
    variables: {},
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  fetch(QUERY_URL, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      res.sendStatus(200)
    })
    .catch((error) => {
      console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
})

//Old get route for coupon books data
//Get route for coupon books data
// router.get("/", (req, res) => {
//     const queryText = `SELECT * FROM "coupon_book";`;
//     pool.query(queryText)
//     .then(result => {
//         res.send(result.rows)
//     })
//     .catch((err) => {
//         console.log("Error getting coupon books", err);
//         res.sendStatus(500)
//     })
// })

//New post route to add a coupon book year with devii api
router.post("/newcouponbook", (req, res) => {
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const year = req.body;
  const query = `{\r\n mutation{\r\n create_coupon_book(\r\n input:{ \r\n year: ${year}\r\n }\r\n){\r\n id\r\n year\r\n}\r\n}`;

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
  myHeaders.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    query: query,
    variables: {},
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  fetch(QUERY_URL, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      res.sendStatus(200)
    })
    .catch((error) => {
      console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
})

//Old post route to add a new coupon book year
//Post route to add a new coupon book
// router.post("/", (req, res) => {
//     const year = req.body;
//     const queryText = `INSERT INTO "coupon_book" ("year")
//     VALUES ($1);`;

//     pool.query(queryText, [year])
//     .then(() => {
//         res.sendStatus(201)
//     })
//     .catch((err) => {
//         console.log("Error adding new coupon book", err);
//         res.sendStatus(500)
//     })
// })

module.exports = router;