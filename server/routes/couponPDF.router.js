const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const { upload } = require("../modules/upload");

router.get("/", (req, res) => {
  const filename = req.params.filename;
  console.log("filename = ", filename);
  // Assuming you have the PDF data stored in some way
  const pdfData = req.params.pdf_data;
  const frontViewPdf = req.params.front_view_pdf;
  const backViewPdf = req.params.back_view_pdf;
  console.log("pdfData = ", pdfData);
  console.log("frontViewPdf = ", frontViewPdf);
  console.log("backViewPdf = ", backViewPdf);

  const queryText = "SELECT * FROM coupon";

  pool
    .query(queryText)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error fetching data from the 'coupon' table");
    });
});

router.get("/:id", (req, res) => {
  const merchantId = req.params.id;
  const filename = req.params.filename;
  console.log("filename = ", filename);
  // Assuming you have the PDF data stored in some way
  const pdfData = req.params.pdf_data;
  const frontViewPdf = req.params.front_view_pdf;
  const backViewPdf = req.params.back_view_pdf;
  console.log("pdfData = ", pdfData);
  console.log("frontViewPdf = ", frontViewPdf);
  console.log("backViewPdf = ", backViewPdf);

  // const queryText =
  //   "SELECT pdf_data, filename, front_view_pdf, back_view_pdf FROM coupon WHERE merchant_id = $1";

  const queryText = "SELECT * FROM coupon WHERE merchant_id = $1";

  pool
    .query(queryText, [merchantId])
    .then((result) => {
      console.log("FROM couponPDFs.router: ", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in the GET / request for couponPDFs", err);
      res.sendStatus(500);
    });
});

router.get("/details/:id", (req, res) => {
  const couponId = req.params.id;
  console.log("couponId = ", couponId);

  // const queryText = "SELECT * FROM coupon WHERE id = $1";

  const queryText = `
          SELECT
            c.*,
            l.id AS location_id,
            l.location_name,
            l.phone_number,
            l.address,
            l.city,
            l.state,
            l.zip,
            l.coordinates,
            l.region_id,
            l.merchant_id AS location_merchant_id,
            l.additional_details AS location_additional_details
          FROM
            coupon c
          JOIN
            coupon_location cl ON c.id = cl.coupon_id
          JOIN
            location l ON cl.location_id = l.id
          WHERE
            c.id = $1;
    `;

  pool
    .query(queryText, [couponId])
    .then((result) => {
      console.log("FROM couponPDFs.router: ", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in the GET / request for couponPDFs", err);
      res.sendStatus(500);
    });
});

router.post("/", rejectUnauthenticated, async (req, res) => {
  console.log(req.body);
  const coupon = req.body;
  const merchantId = coupon.merchant_id;
  const offer = coupon.offer;
  const value = coupon.value;
  const exclusions = coupon.exclusions;
  const additionalInfo = coupon.additional_info;
  const locationIds = coupon.location_ids; // Assuming location_ids is passed in the request

  try {
    // Start a transaction
    await pool.query("BEGIN");

    // Insert coupon into coupon table
    const couponInsertQuery = `
      INSERT INTO coupon (
        merchant_id, 
        offer,
        value, 
        exclusions, 
        additional_info) 
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;
    const couponResult = await pool.query(couponInsertQuery, [
      merchantId,
      offer,
      value,
      exclusions,
      additionalInfo,
    ]);
    const newCouponId = couponResult.rows[0].id;

    // Insert coupon locations into coupon_location table
    const locationInsertQuery = `
      INSERT INTO coupon_location (coupon_id, location_id)
      SELECT $1, location_id
      FROM unnest($2::integer[]) AS location_id;
    `;
    await pool.query(locationInsertQuery, [newCouponId, locationIds]);

    // Commit the transaction
    await pool.query("COMMIT");

    res.sendStatus(200);
  } catch (error) {
    // Rollback the transaction in case of an error
    await pool.query("ROLLBACK");
    console.error(error);
    res.status(500).send("Error uploading coupon");
  }
});

// POST route for uploading front view PDF
// router.post("/front/:id", upload.single("pdf"), (req, res) => {
router.put("/front/:id", upload.single("pdf"), (req, res) => {
  console.log("PUT req.body = ", req.body);
  const frontViewPdf = req.file.buffer;
  const filename = req.file.originalname;
  // const merchantId = req.params.id;
  const couponId = req.params.id;

  // Insert the filename and merchantId into the database
  pool
    // .query(
    //   "INSERT INTO coupon (filename_front, front_view_pdf, merchant_id) VALUES ($1, $2, $3)",
    //   [filename, frontViewPdf, merchantId]
    // )
    .query(
      "UPDATE coupon SET filename_front = $1, front_view_pdf = $2 WHERE id = $3",
      [filename, frontViewPdf, couponId]
    )
    .then(() => {
      res
        .status(201)
        .send({ message: "Front view PDF uploaded successfully!" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error uploading front view PDF");
    });
});

// POST route for uploading back view PDF
router.put("/back/:id", upload.single("pdf"), (req, res) => {
  const couponId = req.params.id;
  const backViewPdf = req.file.buffer;
  const filename = req.file.originalname;

  // Insert the filename into the database
  pool
    .query(
      "UPDATE coupon SET filename_back = $1, back_view_pdf = $2 WHERE id = $3",
      [filename, backViewPdf, couponId]
    )
    .then(() => {
      res.status(201).send({ message: "Back view PDF uploaded successfully!" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error uploading back view PDF");
    });
});

module.exports = router;
