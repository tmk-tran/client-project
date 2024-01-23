const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post("/", (req, res) => {
    const ACCESS_TOKEN = auth_response.access_token;
    const QUERY_URL = "https://api.devii.io/query";
    const query = "{\r\n  location{\r\n id\r\n location_name\r\n address\r\n city\r\n state\r\n zip\r\n coordinates\r\n region_id\r\n is_deleted\r\n }\r\n}";

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

// Post route to create a new location via Devii api
router.post("/newlocation", (req, res) => {
    const newLocation = req.body;
    const ACCESS_TOKEN = auth_response.access_token;
    const QUERY_URL = "https://api.devii.io/query";
    const query = `{\r\n  mutation{\r\n  create_coupon(\r\n input:{\r\n location_name: ${newLocation.location_name}\r\n address: ${newLocation.address}\r\n city: ${newLocation.city}\r\n state: ${newLocation.state}\r\n zip: ${newLocation.zip}\r\n coordinates: ${newLocation.coordinates}\r\n region_id: ${newLocation.region_id}\r\n is_deleted: ${newLocation.is_deleted}\r\n}\r\n){\r\n id\r\n location_name\r\n address\r\n city\r\n state\r\n zip\r\n coordinates\r\n region_id\r\n is_deleted\r\n }\r\n}\r\n}`;

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

// Post route to update an existing location via Devii api
router.post("/updatelocation/:id", (req, res) => {
    const id = req.params.id
    const updatedLocation = req.body;
    const ACCESS_TOKEN = auth_response.access_token;
    const QUERY_URL = "https://api.devii.io/query";
    const query = `{\r\n  mutation{\r\n  update_coupon(\r\n input:{\r\n location_name: ${updatedLocation.location_name}\r\n address: ${updatedLocation.address}\r\n city: ${updatedLocation.city}\r\n state: ${updatedLocation.state}\r\n zip: ${updatedLocation.zip}\r\n coordinates: ${updatedLocation.coordinates}\r\n region_id: ${updatedLocation.region_id}\r\n is_deleted: ${updatedLocation.is_deleted}\r\n} id: ${id}\r\n){\r\n id\r\n location_name\r\n address\r\n city\r\n state\r\n zip\r\n coordinates\r\n region_id\r\n is_deleted\r\n }\r\n}\r\n}`;

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



module.exports = router;