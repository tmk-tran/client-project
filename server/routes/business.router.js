const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Post router to fetch business data via the Devii api
router.post("/", (req, res) => {
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = "{\r\n  business{\r\n id\r\n business_name\r\n}\r\n}";

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
});

//Post route to create a new buisness vie Devii api
router.post("/new", (req, res) => {
  const newBusiness = req.body;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n mutation{ create_buiness(\r\n business{\r\n business_name: ${newBusiness.business_name}\r\n}\r\n){\r\n id\r\n business_name\r\n}\r\n}\r\n}`;

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
});

//Route to update a business via the Devii api
router.post("/update/:id", (req, res) => {
  const id = req.params.id
  const updatedBusiness = req.body;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n mutation{ create_buiness(\r\n business{\r\n business_name: ${updatedBusiness.business_name}\r\n} id: ${id} \r\n){\r\n id\r\n business_name\r\n}\r\n}\r\n}`;

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
});


module.exports = router;