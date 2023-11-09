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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;