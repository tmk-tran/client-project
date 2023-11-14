const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Get route for coupon books data
router.get("/", (req, res) => {
    const queryText = `SELECT * FROM "coupon_book";`;
    pool.query(queryText)
    .then(result => {
        res.send(result.rows)
    })
    .catch((err) => {
        console.log("Error getting coupon books", err);
        res.sendStatus(500)
    })
})
//Post route to add a new coupon book
router.post("/", (req, res) => {
    const year = req.body;
    const queryText = `INSERT INTO "coupon_book" ("year")
    VALUES ($1);`;

    pool.query(queryText, [year])
    .then(() => {
        res.sendStatus(201)
    })
    .catch((err) => {
        console.log("Error adding new coupon book", err);
        res.sendStatus(500)
    })
})

module.exports = router;