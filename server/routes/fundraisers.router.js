const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Get route for fundraisers
router.get("/groupfundraisers", (req, res) => {
  const groupId = req.body
  const queryText = `SELECT "f".group_id, "f".title, "f".description, "f".photo, "f". requested_book_quantity, "f".book_quantity_checked_out, "f".book_checked_out_total_value, "f".book_quantity_checked_in, "f".books_sold, "f".money_received, "f".start_date, "f".end_date, "cb".year, "f".outstanding_balance  FROM "fundraiser" AS "f"
  JOIN "coupon_book" AS "cb" ON "f".coupon_book_id = "cb".id
  WHERE "f".group_id = $1
  ORDER BY "f".closed = false;`;
  pool.query(queryText, [groupId])
  .then(result => {
    res.send(result.rows);
  })
  .catch((err) => {
    console.log("Error in getting fundraisers", err);
    res.sendStatus(500);
  })
})

//Post route for a new fundraiser, data comes from form inputs
router.post('/', (req, res) => {
  const newFundraiser = req.body
  const queryText = `INSERT INTO "fundraiser" ("group_id", "title", "description", "photo", "requested_book_quantity", "book_quantity_checked_out", "book_checked_out_total_value", "book_quantity_checked_in", "books_sold", "money_received", "start_date", "end_date", "coupon_book_id", "outstanding_balance")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`;

  pool.query(queryText, [newFundraiser.group_id, newFundraiser.title, newFundraiser.description, newFundraiser.photo, newFundraiser.requested_book_quantity, newFundraiser.book_quantity_checked_out, newFundraiser.book_checked_out_total_value, newFundraiser.book_quantity_checked_in, newFundraiser.books_sold, newFundraiser.money_received, newFundraiser.start_date, newFundraiser.end_date, newFundraiser.coupon_book_id, newFundraiser.outstanding_balance])
  .then(() => {
    res.sendStatus(201)
  })
  .catch((err) => {
    console.log("Error adding new fundraiser", err);
    res.sendStatus(500)
  })
});
//Updates all of the fundraiser details
router.put("/:id", (req, res) =>{
  const id = req.params.id;
  const updatedFundraiser = req.body;
  const queryText = `UPDATE "fundraiser" SET "group_id" = $1, "title" = $2, "description" = $3, "photo" = $4, "requested_book_quantity" = $5, "book_quantity_checked_out" = $6, "book_checked_out_total_value" = $7, "book_quantity_checked_in" = $8, "books_sold" = $9, "money_received" = $10, "start_date" = $11, "end_date" = $12, "coupon_book_id" = $13, "outstanding_balance" = $14;`;

  pool.query(queryText, [updatedFundraiser.group_id, updatedFundraiser.title, updatedFundraiser.description, updatedFundraiser.photo, updatedFundraiser.requested_book_quantity, updatedFundraiser.book_quantity_checked_out, updatedFundraiser.book_checked_out_total_value, updatedFundraiser.book_quantity_checked_in, updatedFundraiser.books_sold, updatedFundraiser.money_received, updatedFundraiser.start_date, updatedFundraiser.end_date, updatedFundraiser.coupon_book_id, updatedFundraiser.outstanding_balance])
  .then(() => {
    res.sendStatus(200)
  })
  .catch((err) => {
    console.log("Error in updating fundraiser", err);
    res.sendStatus(500)
  })
})
//Sets status of fundraiser to closed when completed
router.put("/close/:id", (req, res) => {
  const id = req.params.id;
  const queryText = `UPDATE "fundraiser" SET "closed" = 'true' WHERE "id" = $1;`;
  pool.query(queryText, [id])
  .then(() => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log("Error in closing fundraiser", err);
    res.sendStatus(500);
  })
})
//Delete route to set a fundraiser to deleted, need to check to see if we really need this one
router.put("/delete/:id", (req, res) => {
  const id = req.params.id;
  const queryText = `UPDATE "fundraiser" SET "is_deleted" = 'true' WHERE "id" = $1;`;
  pool.query(queryText, [id])
  .then(() => {
    res.sendStatus(200)
  })
  .catch((err) => {
    console.log("Error in deleting fundraiser", err);
    res.sendStatus(500)
  })
})

module.exports = router;