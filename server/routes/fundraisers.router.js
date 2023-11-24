const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Get route for fundraisers with a specific group id
router.get("/groupfundraisers/:id", (req, res) => {
  const groupId = req.params.id
  const queryText = `SELECT "f".id, "f".group_id, "f".title, "f".description, "f".photo, "f". requested_book_quantity, "f".book_quantity_checked_out, "f".book_checked_out_total_value, "f".book_quantity_checked_in, "f".books_sold, "f".money_received, "f".start_date, "f".end_date, "f".goal, "cb".year, "f".outstanding_balance, "f".closed  FROM "fundraiser" AS "f"
  JOIN "coupon_book" AS "cb" ON "f".coupon_book_id = "cb".id
  WHERE "f".group_id = $1
  ORDER BY "f".id ASC,"f".closed = false;`;
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
  const queryText = `INSERT INTO "fundraiser" ("group_id", "title", "description", "requested_book_quantity", "book_quantity_checked_out", "book_quantity_checked_in", "books_sold", "goal", "money_received", "start_date", "end_date", "coupon_book_id" )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`;

  pool.query(queryText, [newFundraiser.group_id, newFundraiser.title, newFundraiser.description, newFundraiser.requested_book_quantity, newFundraiser.book_quantity_checked_out,  newFundraiser.book_quantity_checked_in, newFundraiser.books_sold, newFundraiser.goal, newFundraiser.money_received, newFundraiser.start_date, newFundraiser.end_date, newFundraiser.coupon_book_id])
    .then(() => {
      res.sendStatus(201)
    })
    .catch((err) => {
      console.log("Error adding new fundraiser", err);
      res.sendStatus(500)
    })
});

//Put route for updating amounts of books and money in a fundraiser
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedAmount = req.body;
  console.log(updatedAmount)
  const queryText = `UPDATE "fundraiser" SET "title" = $1, "book_quantity_checked_out" = $2, "book_quantity_checked_in" = $3, "books_sold" = $4, "money_received" = $5, "goal" = $6 WHERE "id" = $7;`;

  pool.query(queryText, [updatedAmount.title, updatedAmount.newBooksCheckedOut, updatedAmount.newBooksCheckedIn, updatedAmount.newBooksSold, updatedAmount.newMoneyReceived, updatedAmount.newGoal,  id])
    .then(() => {
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log("Error in updating amounts", err);
      res.sendStatus(500)
    })
})
//PUT route that sets a fundraiser to closed
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
//PUT route to reopen a fundraiser
router.put("/open/:id", (req, res) => {
  const id = req.params.id;
  const queryText = `UPDATE "fundraiser" SET "closed" = 'false' WHERE "id" = $1;`;
  pool.query(queryText, [id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error in opening fundraiser", err);
      res.sendStatus(500);
    })
})

//Delete route to set a fundraiser to deleted, not used in current scope of admin dashboard
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