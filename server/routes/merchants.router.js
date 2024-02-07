const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, (req, res) => {
  // const queryText = `SELECT * FROM merchant;`;
  const queryText = `SELECT * FROM merchant ORDER BY merchant_name;`;

  pool
    .query(queryText)
    .then((result) => {
      console.log("from GET ALL merchants.router: ", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in the GET / request for authorized users", err);
      res.sendStatus(500);
    });
});

router.get("/:id", rejectUnauthenticated, (req, res) => {
  const merchantId = req.params.id;

  const queryText = `SELECT * FROM merchant WHERE id = $1;`;
  pool
    .query(queryText, [merchantId])
    .then((result) => {
      console.log("from GET /id merchants.router: ", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in the GET / request for authorized users", err);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  const data = req.body;
  console.log(req.body);
  console.log(req.user);

  const merchantName = data.merchant_name;
  const address = data.address;
  const city = data.city;
  const state = data.state;
  const zip = data.zip;
  const primaryContactFirstName = data.primary_contact_first_name;
  const primaryContactLastName = data.primary_contact_last_name;
  const contactPhoneNumber = data.contact_phone_number;
  const contactEmail = data.contact_email;
  const merchantLogo = data.merchant_logo;

  const queryText = `
      INSERT INTO "merchant" (
        "merchant_name",
        "address",
        "city",
        "state",
        "zip",
        "primary_contact_first_name",
        "primary_contact_last_name",
        "contact_phone_number",
        "contact_email",
        "merchant_logo"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;

  pool
    .query(queryText, [
      merchantName,
      address,
      city,
      state,
      zip,
      primaryContactFirstName,
      primaryContactLastName,
      contactPhoneNumber,
      contactEmail,
      merchantLogo,
    ])
    .then((response) => {
      console.log("response from POST merchants.router: ", response.rows);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error in organizations POST route", err);
      res.sendStatus(500);
    });
});

router.put("/:id", rejectUnauthenticated, (req, res) => {
  const merchant = req.body;
  const merchantId = req.params.id;
  console.log("MERCHANT = ", merchant);

  // Merchant Details
  const merchantName = merchant.merchant_name;
  const address = merchant.address;
  const city = merchant.city;
  const state = merchant.state;
  const zip = merchant.zip;

  // Merchant Contact Details
  const firstName = merchant.primary_contact_first_name;
  const lastName = merchant.primary_contact_last_name;
  const phone = merchant.contact_phone_number;
  const email = merchant.contact_email;

  // const user = req.user.id;
  const queryText = `UPDATE "merchant" SET merchant_name = $1, address = $2, city = $3, state = $4, zip = $5, primary_contact_first_name = $6, primary_contact_last_name = $7, contact_phone_number = $8, contact_email = $9 WHERE id = $10;`;
  pool
    .query(queryText, [
      merchantName,
      address,
      city,
      state,
      zip,
      firstName,
      lastName,
      phone,
      email,
      merchantId,
    ])
    .then((response) => {
      console.log("response from EDIT merchants.router: ", response.rows);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error saving to database, from merchants.router", err);
      res.sendStatus(500);
    });
});

module.exports = router;
