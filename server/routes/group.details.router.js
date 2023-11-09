const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Get route for fundraisers and group details
router.get('/:id', (req, res) => {
    const id = req.params.id
  const queryText = `SELECT "f".group_id, "f".title, "f".description, "f".photo, "f". requested_book_quantity, "f".book_quantity_checked_out, "f".book_checked_out_total_value, "f".book_quantity_checked_in, "f".books_sold, "f".money_received, "f".start_date, "f".end_date, "cb".year, "f".outstanding_balance, "g".department, "g".sub_department, "g".group_photo, "g".group_description  FROM "fundraiser" AS "f" 
  JOIN "group" AS "g" on "f".group_id = "g".id 
  JOIN "coupon_book" AS "cb" ON "f".coupon_book_id = "cb".id
   WHERE "g".id = $1 
  ORDER BY "f".closed = false;`;

  pool.query(queryText, id)
  .then(result => {
    res.send(result.rows);
  })
  .catch(err =>{
    console.log("Error getting group details", err);
    res.sendStatus(500)
  })
});

//Post route for groups
router.post('/', (req, res) => {
//   const id = req.params.id;
  const newGroup = req.body;
  const queryText = `INSERT INTO "group" ("organization_id", "department", "sub_department", "group_nickname", "group_photo", "group_description")
  VALUES ($1, $2, $3, $4, $5, $6);`

  pool.query(queryText, [newGroup.organization_id, newGroup.department, newGroup.sub_department, newGroup.group_nickname, newGroup.group_photo, newGroup.group_desctiption])
  .then(() => {
    res.sendStatus(201);
  })
  .catch((err) => {
    console.log("Error adding new group", err);
    res.sendStatus(500);
  })
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedGroup = req.body;
    const queryText = `UPDATE "group" SET "department" = $1, "sub_department" = $2, "group_nickname" = $3, "group_photo" = $4, "group_description" = $5 WHERE "id" = $6;`;

    pool.query(queryText, [updatedGroup.department, updatedGroup.sub_department, updatedGroup.group_nickname, updatedGroup.group_photo, updatedGroup.group_desctiption, id])
    .then(() => {
        res.sendStatus(200)
    })
    .catch((err) => {
        console.log("Error updating group", err);
        res.sendStatus(500);
    })
})

module.exports = router;