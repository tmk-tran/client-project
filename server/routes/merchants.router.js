const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Post route to fetch data from db via Devii api
router.post("/", (req, res) => {
    const ACCESS_TOKEN = auth_response.access_token;
    const QUERY_URL = "https://api.devii.io/query";
    const query = "{\r\n  merchant{\r\n id\r\n buisness_id\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n contact_phone_number\r\n contact_email\r\n is_deleted\r\n}\r\n}";

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
})

// Post route to creat a new merchant via the Devii api
router.post("/newmerchant", (req, res) => {
    const newMerchant = req.body;
    const ACCESS_TOKEN = auth_response.access_token;
    const QUERY_URL = "https://api.devii.io/query";
    const query = `{\r\n  mutation{\r\n  create_coupon(\r\n input:{\r\n buisness_id: ${newMerchant.business_id}\r\n address: ${newMerchant.address}\r\n city: ${newMerchant.city}\r\n state: ${newMerchant.state}\r\n zip: ${newMerchant.zip}\r\n primary_contact_first_name: ${newMerchant.primary_contact_first_name}\r\n primary_contact_last_name: ${newMerchant.primary_contact_last_name}\r\n contact_phone_number: ${newMerchant.contact_phone_number}\r\n contact_email: ${newMerchant.contact_email}\r\n }\r\n){\r\n merchant{\r\n id\r\n buisness_id\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n contact_phone_number\r\n contact_email\r\n is_deleted\r\n}\r\n}\r\n}`;

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

// Post route to update a merchant, can be used for all updates
// Post route to creat a new merchant via the Devii api
router.post("/updatemerchant/:id", (req, res) => {
    const id = req.params.id;
    const updatedMerchant = req.body;
    const ACCESS_TOKEN = auth_response.access_token;
    const QUERY_URL = "https://api.devii.io/query";
    const query = `{\r\n  mutation{\r\n  update_coupon(\r\n input:{\r\n buisness_id: ${updatedMerchant.business_id}\r\n address: ${updatedMerchant.address}\r\n city: ${updatedMerchant.city}\r\n state: ${updatedMerchant.state}\r\n zip: ${updatedMerchant.zip}\r\n primary_contact_first_name: ${updatedMerchant.primary_contact_first_name}\r\n primary_contact_last_name: ${updatedMerchant.primary_contact_last_name}\r\n contact_phone_number: ${updatedMerchant.contact_phone_number}\r\n contact_email: ${updatedMerchant.contact_email}\r\n is_deleted: ${updatedMerchant.is_deleted}\r\n} id: ${id}\r\n){\r\n merchant{\r\n id\r\n buisness_id\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n contact_phone_number\r\n contact_email\r\n is_deleted\r\n}\r\n}\r\n}`;

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