const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Post route to fetch the region data with location and geo-spacial data via Devii api
router.post("/", (req, res) => {
    const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJpYXQiOjE3MDU0MzA2NjMsIm5iZiI6MTcwNTQzMDY2MywianRpIjoiYzA3ZWNlMGEtNjdmYS00NjBiLThmOGQtZjc3M2NlNDk5OWY2IiwiZXhwIjoxNzA1NTE3MDYzLCJzdWIiOnsicm9sZWlkIjoyMDMzNiwidGVuYW50aWQiOjEwMTIxfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.Af36SYvSr6U3MO7sIRQKYlK9vf1xrphIsIdt50e7nz7oI2LEFLA42Q9MyiL0tN84YjfMYPNmkm3j7gPgnAlGkLO6ANBj4h9UVSdTYXqElXD3TkRiJ4Gduf_J2wQCpEhewL7oBzBotxT-3BIFszGluwujCSW7afoQUH6YkpjVEIP0KaP6";
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
      .then((response) => response.text())
       .then((result) => {console.log(result);
      res.sendStatus(200)})
      .catch((error) => {console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
});

//Post route to create a new region via Devii api
router.post("/new", (req, res) => {
    const newRegion = req.body;
    const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJpYXQiOjE3MDU0MzA2NjMsIm5iZiI6MTcwNTQzMDY2MywianRpIjoiYzA3ZWNlMGEtNjdmYS00NjBiLThmOGQtZjc3M2NlNDk5OWY2IiwiZXhwIjoxNzA1NTE3MDYzLCJzdWIiOnsicm9sZWlkIjoyMDMzNiwidGVuYW50aWQiOjEwMTIxfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.Af36SYvSr6U3MO7sIRQKYlK9vf1xrphIsIdt50e7nz7oI2LEFLA42Q9MyiL0tN84YjfMYPNmkm3j7gPgnAlGkLO6ANBj4h9UVSdTYXqElXD3TkRiJ4Gduf_J2wQCpEhewL7oBzBotxT-3BIFszGluwujCSW7afoQUH6YkpjVEIP0KaP6";
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
       .then((result) => {console.log(result);
      res.sendStatus(200)})
      .catch((error) => {console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
});

//Post route to update a region via Devii api
router.post("/update", (req, res) => {
    const updatedRegion = req.body;
    const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJpYXQiOjE3MDU0MzA2NjMsIm5iZiI6MTcwNTQzMDY2MywianRpIjoiYzA3ZWNlMGEtNjdmYS00NjBiLThmOGQtZjc3M2NlNDk5OWY2IiwiZXhwIjoxNzA1NTE3MDYzLCJzdWIiOnsicm9sZWlkIjoyMDMzNiwidGVuYW50aWQiOjEwMTIxfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.Af36SYvSr6U3MO7sIRQKYlK9vf1xrphIsIdt50e7nz7oI2LEFLA42Q9MyiL0tN84YjfMYPNmkm3j7gPgnAlGkLO6ANBj4h9UVSdTYXqElXD3TkRiJ4Gduf_J2wQCpEhewL7oBzBotxT-3BIFszGluwujCSW7afoQUH6YkpjVEIP0KaP6";
    const QUERY_URL = "https://api.devii.io/query";
    const query = `{\r\n mutation{\r\n update_region(\r\n input:{\r\n region_name: ${updatedRegion.name}\r\n} id: ${updatedRegion.id} \r\n){\r\n id\r\n region_name\r\n \r\n}`;
    
   
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
       .then((result) => {console.log(result);
      res.sendStatus(200)})
      .catch((error) => {console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
});