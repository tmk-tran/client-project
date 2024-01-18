const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:id", (req, res) => {
  const orgId = req.params.id;
  // const queryText = `SELECT
  // o.id AS organization_id,
  // o.organization_name,
  // o.type,
  // o.address,
  // o.city,
  // o.state,
  // o.zip,
  // o.primary_contact_first_name,
  // o.primary_contact_last_name,
  // o.primary_contact_phone,
  // o.primary_contact_email,
  // o.organization_logo,
  // o.organization_earnings,
  // g.id AS group_id,
  // g.department,
  // g.sub_department,
  // g.group_nickname,
  // g.group_photo,
  // g.group_description,
  // SUM(f.goal)
  // FROM
  // "organization" o
  // LEFT JOIN
  // "group" g ON o.id = g.organization_id
  // LEFT JOIN
  // "fundraiser" AS f ON f.group_id = g.id
  // WHERE
  // o.id = $1 AND
  // o.is_deleted = false AND
  // (g.is_deleted = false OR g.is_deleted IS NULL)
  // GROUP BY
  // o.id, g.id, f.group_id
  // ORDER BY LOWER (g.group_nickname) ASC;`;
  const queryText = `SELECT
  f.id AS fundraiser_id,
  f.title AS fundraiser_title,
  f.description AS fundraiser_description,
  f.start_date AS fundraiser_start_date,
  f.end_date AS fundraiser_end_date,
  f.requested_book_quantity,
  f.book_quantity_checked_out,
  f.book_checked_out_total_value,
  f.book_quantity_checked_in,
  f.books_sold,
  f.money_received,
  f.outstanding_balance,
  f.is_deleted AS fundraiser_is_deleted,
  f.closed AS fundraiser_closed,
  f.goal AS fundraiser_goal,
  
  g.id AS group_id,
  g.organization_id AS group_organization_id,
  g.department AS group_department,
  g.sub_department AS group_sub_department,
  g.group_nickname,
  g.group_photo,
  g.group_description,
  g.is_deleted AS group_is_deleted,
  
  o.id AS organization_id,
  o.organization_name,
  o.type AS organization_type,
  o.address AS organization_address,
  o.city AS organization_city,
  o.state AS organization_state,
  o.zip AS organization_zip,
  o.primary_contact_first_name,
  o.primary_contact_last_name,
  o.primary_contact_phone,
  o.primary_contact_email,
  o.organization_logo,
  o.is_deleted AS organization_is_deleted,
  o.organization_earnings
FROM fundraiser f
JOIN "group" g ON f.group_id = g.id
JOIN organization o ON g.organization_id = o.id
WHERE o.id = $1;`;

  pool
    .query(queryText, [orgId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR in fundraisers", err);
      res.sendStatus(500);
    });
});

//Get route for fundraisers with a specific group id
router.get("/groupfundraisers/:id", (req, res) => {
  const groupId = req.params.id;
  const queryText = `SELECT 
  "f".id, 
  "f".group_id, 
  "f".title, 
  "f".description, 
  "f".photo, 
  "f".requested_book_quantity, 
  "f".book_quantity_checked_out, 
  "f".book_checked_out_total_value, 
  "f".book_quantity_checked_in, 
  "f".books_sold, 
  "f".money_received, 
  "f".start_date, 
  "f".end_date, 
  "f".goal, 
  "cb".year, 
  "f".outstanding_balance, 
  "f".closed,
  "o".organization_earnings
FROM "fundraiser" AS "f"
JOIN "group" AS "g" ON "f".group_id = "g".id
JOIN "organization" AS "o" ON "g".organization_id = "o".id
JOIN "coupon_book" AS "cb" ON "f".coupon_book_id = "cb".id
WHERE "f".group_id = $1
ORDER BY "f".id ASC, "f".closed = false;`;

  pool
    .query(queryText, [groupId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error in getting fundraisers", err);
      res.sendStatus(500);
    });
});

// New post route to create a new fundraiser with the Devii api
router.post("/", (req, res) => {
  const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJpYXQiOjE3MDU2MDcxMDEsIm5iZiI6MTcwNTYwNzEwMSwianRpIjoiMjRkYzcxNzMtOTM5Ny00OTg2LWEyMTMtNTY3MDA2Mzk0ODBjIiwiZXhwIjoxNzA1NjkzNTAxLCJzdWIiOnsicm9sZWlkIjoyMDMzNiwidGVuYW50aWQiOjEwMTIxfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.AOI_BqIkPtIIzVmLCzGWVMDGF1Mka9GV29mcPHyUXCOlb-tEwOv_r_5OoI7ZAN2eOObEOnXKEpxEoul4bptVnX1UATbzKAt843WebZJMhCznuFHTEKXqvu4m56wGQo9Yvb-DNW6fSPeCS9eV7jxD7Sc1yv6s735wZLdqrNFfDkwnDQfn";
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n  mutation{\r\n create_fundraiser(\r\n input:{\r\n group_id: 1\r\n group_id: 1\r\n title: "string"\r\n description: "string"\r\n requested_book_quantity: 1\r\n book_quantity_checked_out: 1\r\n book_quantity_checked_in: 1\r\n books_sold: 1\r\n money_received: 1\r\n start_date: Date\r\n end_date: Date\r\n coupon_book_id: 1\r\n goal: 1\r\n }\r\n ){\r\n id\r\n group_id\r\n title\r\n description\r\n photo\r\n requested_book_quantity\r\n book_quantity_checked_out\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n}\r\n}`;

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


// Old post route to create a new fundraiser
// //Post route for a new fundraiser, data comes from form inputs
// router.post("/", (req, res) => {
//   const newFundraiser = req.body;
//   console.log(req.body);
//   const queryText = `INSERT INTO "fundraiser" ("group_id", "title", "description", "requested_book_quantity", "book_quantity_checked_out", "goal", "start_date", "end_date", "coupon_book_id", "books_sold", "book_quantity_checked_in", "money_received")
//   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`;

//   pool.query(queryText, [newFundraiser.group_id, newFundraiser.title, newFundraiser.description, newFundraiser.requested_book_quantity, newFundraiser.book_quantity_checked_out, newFundraiser.goal, newFundraiser.start_date, newFundraiser.end_date, newFundraiser.coupon_book_id, newFundraiser.books_sold, newFundraiser.book_quantity_checked_in, newFundraiser.money_received])
//     .then(() => {
//       res.sendStatus(201);
//     })
//     .catch((err) => {
//       console.log("Error adding new fundraiser", err);
//       res.sendStatus(500);
//     });
// });

//New update route that uses Devii api, can be used for all updates
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedFundraiser = req.body;
  const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJpYXQiOjE3MDU0MzA2NjMsIm5iZiI6MTcwNTQzMDY2MywianRpIjoiYzA3ZWNlMGEtNjdmYS00NjBiLThmOGQtZjc3M2NlNDk5OWY2IiwiZXhwIjoxNzA1NTE3MDYzLCJzdWIiOnsicm9sZWlkIjoyMDMzNiwidGVuYW50aWQiOjEwMTIxfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.Af36SYvSr6U3MO7sIRQKYlK9vf1xrphIsIdt50e7nz7oI2LEFLA42Q9MyiL0tN84YjfMYPNmkm3j7gPgnAlGkLO6ANBj4h9UVSdTYXqElXD3TkRiJ4Gduf_J2wQCpEhewL7oBzBotxT-3BIFszGluwujCSW7afoQUH6YkpjVEIP0KaP6";
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n  mutation{\r\n update_fundraiser(\r\n input:{\r\n  title: ${updatedFundraiser.newTitle}\r\n book_quantity_checked_out: ${updatedFundraiser.newBookCheckedOut}\r\n book_quantity_checked_in: ${updatedFundraiser.newBooksCheckedIn}\r\n books_sold: ${updatedFundraiser.newBooksSold}\r\n money_received: ${updatedFundraiser.newMoneyReceived}\r\n is_deleted: ${updatedFundraiser.is_deleted}\r\n closed: ${updatedFundraiser.closed}\r\n goal: ${updatedFundraiser.newGoal}\r\n}\r\n id: ${id}\r\n ){\r\n id\r\n group_id\r\n title\r\n description\r\n photo\r\n requested_book_quantity\r\n book_quantity_checked_out\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n}\r\n}\r\n}`;

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

// Origional put routes for updates

// //Put route for updating amounts of books and money in a fundraiser
// router.put("/:id", (req, res) => {
//   const id = req.params.id;
//   const updatedAmount = req.body;
//   console.log(updatedAmount);
//   const queryText = `UPDATE "fundraiser" SET "title" = $1, "book_quantity_checked_out" = $2, "book_quantity_checked_in" = $3, "books_sold" = $4, "money_received" = $5, "goal" = $6 WHERE "id" = $7;`;

//   pool
//     .query(queryText, [
//       updatedAmount.title,
//       updatedAmount.newBooksCheckedOut,
//       updatedAmount.newBooksCheckedIn,
//       updatedAmount.newBooksSold,
//       updatedAmount.newMoneyReceived,
//       updatedAmount.newGoal,
//       id,
//     ])
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.log("Error in updating amounts", err);
//       res.sendStatus(500);
//     });
// });
// //PUT route that sets a fundraiser to closed
// router.put("/close/:id", (req, res) => {
//   const id = req.params.id;
//   const queryText = `UPDATE "fundraiser" SET "closed" = 'true' WHERE "id" = $1;`;
//   pool
//     .query(queryText, [id])
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.log("Error in closing fundraiser", err);
//       res.sendStatus(500);
//     });
// });
// //PUT route to reopen a fundraiser
// router.put("/open/:id", (req, res) => {
//   const id = req.params.id;
//   const queryText = `UPDATE "fundraiser" SET "closed" = 'false' WHERE "id" = $1;`;
//   pool
//     .query(queryText, [id])
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.log("Error in opening fundraiser", err);
//       res.sendStatus(500);
//     });
// });

// //Delete route to set a fundraiser to deleted, not used in current scope of admin dashboard
// router.put("/delete/:id", (req, res) => {
//   const id = req.params.id;
//   const queryText = `UPDATE "fundraiser" SET "is_deleted" = 'true' WHERE "id" = $1;`;
//   pool
//     .query(queryText, [id])
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.log("Error in deleting fundraiser", err);
//       res.sendStatus(500);
//     });
// });

module.exports = router;
