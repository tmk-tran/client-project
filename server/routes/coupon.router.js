const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const { upload } = require("../modules/upload");

router.get("/", (req, res) => {
  // can add
  // ARRAY_AGG(l.coordinates) AS coordinates,
  // ARRAY_AGG(l.region_id) AS region_id,
  const queryText = `
              SELECT
                c.*,
                cl.coupon_id AS coupon_id,
                ARRAY_AGG(l.id) AS location_id,
                ARRAY_AGG(l.location_name) AS location_name,
                ARRAY_AGG(l.phone_number) AS phone_number,
                ARRAY_AGG(l.address) AS address,
                ARRAY_AGG(l.city) AS city,
                ARRAY_AGG(l.state) AS state,
                ARRAY_AGG(l.zip) AS zip,
                ARRAY_AGG(l.merchant_id) AS location_merchant_id,
                ARRAY_AGG(l.additional_details) AS location_additional_details,
                m.merchant_name
              FROM
                coupon_location cl
              JOIN
                coupon c ON cl.coupon_id = c.id
              JOIN
                location l ON cl.location_id = l.id
              JOIN
                merchant m ON c.merchant_id = m.id
              GROUP BY
                c.id, m.merchant_name, cl.coupon_id
              ORDER BY
                m.merchant_name ASC;

        `;

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

  const frontViewPdf = req.params.front_view_pdf;
  const backViewPdf = req.params.back_view_pdf;
  console.log("frontViewPdf = ", frontViewPdf);
  console.log("backViewPdf = ", backViewPdf);

  // const queryText = "SELECT * FROM coupon WHERE merchant_id = $1";
  const queryText = `
          SELECT 
            c.*,
            cb.year
          FROM coupon c 
          JOIN coupon_book cb 
          ON c.book_id = cb.id 
          WHERE c.merchant_id = $1`;

  pool
    .query(queryText, [merchantId])
    .then((result) => {
      console.log("FROM coupon.router GET /:id route: ", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in the GET / request for coupons", err);
      res.sendStatus(500);
    });
});

router.get("/details/:id", (req, res) => {
  const couponId = req.params.id;
  console.log("couponId = ", couponId);

  // const queryText = "SELECT * FROM coupon WHERE id = $1";

  // const queryText = `
  //         SELECT
  //           c.*,
  //           l.id AS location_id,
  //           l.location_name,
  //           l.phone_number,
  //           l.address,
  //           l.city,
  //           l.state,
  //           l.zip,
  //           l.coordinates,
  //           l.region_id,
  //           l.merchant_id AS location_merchant_id,
  //           l.additional_details AS location_additional_details
  //         FROM
  //           coupon c
  //         JOIN
  //           coupon_location cl ON c.id = cl.coupon_id
  //         JOIN
  //           location l ON cl.location_id = l.id
  //         WHERE
  //           c.id = $1;
  //   `;

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
              LEFT JOIN
                coupon_location cl ON c.id = cl.coupon_id
              LEFT JOIN
                location l ON cl.location_id = l.id
              WHERE
                c.id = $1;
            `;

  pool
    .query(queryText, [couponId])
    .then((result) => {
      console.log("FROM coupon.router GET /details/:id : ", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in the GET / request for coupons", err);
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
  const bookId = coupon.book_id;
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
        additional_info,
        book_id) 
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;
    const couponResult = await pool.query(couponInsertQuery, [
      merchantId,
      offer,
      value,
      exclusions,
      additionalInfo,
      bookId,
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

// PUT route for redeeming a coupon
router.put("/redeem/:id", (req, res) => {
  const couponId = req.params.id;

  const queryText = `
    UPDATE coupon
    SET is_redeemed = true
    WHERE id = $1;
  `;

  pool
    .query(queryText, [couponId])
    .then((response) => {
      console.log("Coupon redeemed:", response.rows);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error("Error redeeming coupon:", error);
      res.sendStatus(500);
    });
});

// PUT route for uploading front view PDF
router.put("/front/:id", upload.single("pdf"), (req, res) => {
  console.log("PUT req.body = ", req.body);
  const frontViewPdf = req.file.buffer;
  const filename = req.file.originalname;
  // const merchantId = req.params.id;
  const couponId = req.params.id;

  // Insert the filename and merchantId into the database
  pool
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

// PUT route for uploading back view PDF
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

// EDIT route for updating coupon details
router.put(
  "/:merchantId/:couponId",
  rejectUnauthenticated,
  async (req, res) => {
    console.log("COUPON EDIT req.body = ", req.body);
    const coupon = req.body;
    const couponId = req.params.couponId;
    console.log("couponId = ", couponId);

    const offer = coupon.offer;
    const value = coupon.value;
    const exclusions = coupon.exclusions;
    const expiration = coupon.expiration;
    const additionalInfo = coupon.additional_info;

    const queryText = `
      UPDATE 
        coupon
      SET 
        offer = $1,
        value = $2,
        exclusions = $3,
        expiration = $4,
        additional_info = $5
      WHERE id = $6;
  `;

    pool
      .query(queryText, [
        offer,
        value,
        exclusions,
        expiration,
        additionalInfo,
        couponId,
      ])
      .then((response) => {
        console.log("FROM coupon.router EDIT: ", response.rows);
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error("Error in EDIT coupon PUT route", error);
        res.sendStatus(500);
      });
  }
);

module.exports = router;
