const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Basic post route to fetch data for coupons via Devii api
router.post("/", (req, res) => {
    const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJpYXQiOjE3MDU2MDcxMDEsIm5iZiI6MTcwNTYwNzEwMSwianRpIjoiMjRkYzcxNzMtOTM5Ny00OTg2LWEyMTMtNTY3MDA2Mzk0ODBjIiwiZXhwIjoxNzA1NjkzNTAxLCJzdWIiOnsicm9sZWlkIjoyMDMzNiwidGVuYW50aWQiOjEwMTIxfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.AOI_BqIkPtIIzVmLCzGWVMDGF1Mka9GV29mcPHyUXCOlb-tEwOv_r_5OoI7ZAN2eOObEOnXKEpxEoul4bptVnX1UATbzKAt843WebZJMhCznuFHTEKXqvu4m56wGQo9Yvb-DNW6fSPeCS9eV7jxD7Sc1yv6s735wZLdqrNFfDkwnDQfn";
    const QUERY_URL = "https://api.devii.io/query";
    const query = "{\r\n  coupon{\r\n id\r\n description\r\n current_status\r\n time_stamp\r\n file_name\r\n file_storage_key\r\n is_deleted\r\n }\r\n}";

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

// Post route to add a new coupon via Devii api
router.post("/newcoupon", (req, res) => {
    const newCoupon = req.body
    const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJpYXQiOjE3MDU2MDcxMDEsIm5iZiI6MTcwNTYwNzEwMSwianRpIjoiMjRkYzcxNzMtOTM5Ny00OTg2LWEyMTMtNTY3MDA2Mzk0ODBjIiwiZXhwIjoxNzA1NjkzNTAxLCJzdWIiOnsicm9sZWlkIjoyMDMzNiwidGVuYW50aWQiOjEwMTIxfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.AOI_BqIkPtIIzVmLCzGWVMDGF1Mka9GV29mcPHyUXCOlb-tEwOv_r_5OoI7ZAN2eOObEOnXKEpxEoul4bptVnX1UATbzKAt843WebZJMhCznuFHTEKXqvu4m56wGQo9Yvb-DNW6fSPeCS9eV7jxD7Sc1yv6s735wZLdqrNFfDkwnDQfn";
    const QUERY_URL = "https://api.devii.io/query";
    const query = `{\r\n  mutation{\r\n  create_coupon(\r\n input:{\r\n description: ${newCoupon.description}\r\n current_status: ${newCoupon.current_status}\r\n time_stamp: ${newCoupon.time_stamp}\r\n file_name: ${newCoupon.file_name}\r\n file_storage_key: ${newCoupon.file_storage_key}\r\n }\r\n){\r\n id\r\n description\r\n current_status\r\n time_stamp\r\n file_name\r\n file_storage_key\r\n is_deleted \r\n}\r\n}\r\n}`;

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

// Post route to update a coupon via Devii api, can be used for all update purposes
router.post("/updatecoupon/:id", (req, res) => {
    const id = req.params.id
    const updatedCoupon = req.body
    const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJpYXQiOjE3MDU2MDcxMDEsIm5iZiI6MTcwNTYwNzEwMSwianRpIjoiMjRkYzcxNzMtOTM5Ny00OTg2LWEyMTMtNTY3MDA2Mzk0ODBjIiwiZXhwIjoxNzA1NjkzNTAxLCJzdWIiOnsicm9sZWlkIjoyMDMzNiwidGVuYW50aWQiOjEwMTIxfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.AOI_BqIkPtIIzVmLCzGWVMDGF1Mka9GV29mcPHyUXCOlb-tEwOv_r_5OoI7ZAN2eOObEOnXKEpxEoul4bptVnX1UATbzKAt843WebZJMhCznuFHTEKXqvu4m56wGQo9Yvb-DNW6fSPeCS9eV7jxD7Sc1yv6s735wZLdqrNFfDkwnDQfn";
    const QUERY_URL = "https://api.devii.io/query";
    const query = `{\r\n  mutation{\r\n  create_coupon(\r\n input:{\r\n description: ${updatedCoupon.description}\r\n current_status: ${updatedCoupon.current_status}\r\n time_stamp: ${updatedCoupon.time_stamp}\r\n file_name: ${updatedCoupon.file_name}\r\n file_storage_key: ${updatedCoupon.file_storage_key}\r\n is_deleted: ${updatedCoupon.is_deleted}\r\n}\r\n id:${id}\r\n){\r\n id\r\n description\r\n current_status\r\n time_stamp\r\n file_name\r\n file_storage_key\r\n is_deleted \r\n}\r\n}\r\n}`;

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

module.exports = router