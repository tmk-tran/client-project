const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
// ~~~~~~~~~~ Upload Files ~~~~~~~~~~
const multer = require("multer");
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

router.get("/", rejectUnauthenticated, (req, res) => {
  // const queryText = `SELECT * FROM merchant;`;
  const queryText = `
  SELECT 
    id,
    merchant_name,
    address,
    city,
    state,
    zip,
    primary_contact_first_name,
    primary_contact_last_name,
    contact_phone_number,
    contact_email,
    is_deleted,
    archive_reason,
    encode(merchant_logo, 'base64') AS merchant_logo_base64,
    filename,
    website
  FROM 
    merchant 
  WHERE 
    is_deleted=false 
  ORDER BY 
    merchant_name;`;

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

  // const queryText = `SELECT * FROM merchant WHERE id = $1;`;
  const queryText = `
  SELECT
    *,
    encode(merchant_logo, 'base64') AS merchant_logo_base64
  FROM
    merchant
  WHERE
    id = $1;`;

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

router.post("/", upload.single("merchant_logo"), (req, res) => {
  const data = req.body;
  console.log(req.body);
  console.log(req.user);
  const merchantLogo = req.file ? req.file.buffer : null;

  const merchantName = data.merchant_name;
  const address = data.address;
  const city = data.city;
  const state = data.state;
  const zip = data.zip;
  const primaryContactFirstName = data.primary_contact_first_name;
  const primaryContactLastName = data.primary_contact_last_name;
  const contactPhoneNumber = data.contact_phone_number;
  const contactEmail = data.contact_email;
  const filename = data.filename ? data.filename : null;
  let website = data.website;

  // Check if the website address already starts with "http://" or "https://"
  if (!website.startsWith("http://") && !website.startsWith("https://")) {
    // If it doesn't, prepend "https://"
    website = "https://" + website;
  }

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
        "merchant_logo",
        "filename",
        "website"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`;

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
      filename,
      website,
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

router.put(
  "/:id",
  upload.single("merchant_logo"),
  rejectUnauthenticated,
  (req, res) => {
    const merchant = req.body;
    const merchantId = req.params.id;
    console.log("MERCHANT = ", merchant);
    const merchant_logo = req.file ? req.file.buffer : null;

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
    const filename = merchant.filename;
    let website = merchant.website ? merchant.website : null;

    // Check if the website address is not empty and does not start with "http://" or "https://"
    if (
      website &&
      !website.startsWith("http://") &&
      !website.startsWith("https://")
    ) {
      // If it doesn't, prepend "https://"
      website = "https://" + website;
    } else if (!website) {
      // If website is empty, set it to null
      website = null;
    }

    // const user = req.user.id;
    const queryText = `
        UPDATE "merchant" 
        SET 
          merchant_name = $1, 
          address = $2, 
          city = $3, 
          state = $4, 
          zip = $5, 
          primary_contact_first_name = $6, 
          primary_contact_last_name = $7, 
          contact_phone_number = $8, 
          contact_email = $9,
          merchant_logo = $10,
          filename = $11,
          website = $12
        WHERE id = $13;`;
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
        merchant_logo,
        filename,
        website,
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
  }
);

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const { archiveReason } = req.body;

  const queryText = `UPDATE "merchant" SET is_deleted = true, archive_reason = $1 WHERE id = $2;`;
  pool
    .query(queryText, [archiveReason, id])
    .then((response) => {
      console.log("response from DELETE merchants.router: ", response.rows);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error with merchant DELETE route", error);
      res.sendStatus(500);
    });
});

module.exports = router;
