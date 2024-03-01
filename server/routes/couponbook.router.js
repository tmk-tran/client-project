const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//New post route to fetch coupon book data from with Devii api


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