const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Post route to fetch the region data with location and geo-spacial data via Devii api
router.post("/", (req, res) => {
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = "{\r\n    region{\r\n id\r\n region_name\r\n location_collection{\r\n  location_name\r\n address\r\n city\r\n state\r\n zip\r\n coordinates\r\n region_id\r\n is_deleted\r\n}\r\n geom{\r\n srid\r\n wkt\r\n centroid\r\n envelope\r\n}\r\n}\r\n}";

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
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      res.sendStatus(200)
    })
    .catch((error) => {
      console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
});

//Post route to create a new region via Devii api
router.post("/new", (req, res) => {
  const newRegion = req.body;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n mutation{\r\n create_region(\r\n input:{\r\n region_name: ${newRegion.name}\r\n} \r\n){\r\n id\r\n region_name\r\n \r\n}`;


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

//Post route to update a region via Devii api
router.post("/update/:id", (req, res) => {
  const id = req.params.id;
  const updatedRegion = req.body;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n mutation{\r\n update_region(\r\n input:{\r\n region_name: ${updatedRegion.name}\r\n} id: ${id} \r\n){\r\n id\r\n region_name\r\n \r\n}`;


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

module.exports = router