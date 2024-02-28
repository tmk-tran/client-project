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

// Route to retrieve PDF data by ID
// router.get("/:id", async (req, res) => {
//   // router.get("/:id/pdf", async (req, res) => { // Added this for testing new route
//   const couponId = req.params.id;

//   try {
//     // Query the database to get the PDF data by ID
//     const result = await pool.query(
//       "SELECT pdf_data FROM coupon WHERE id = $1",
//       [couponId]
//     );

//     if (result.rows.length > 0) {
//       const pdfData = result.rows[0].pdf_data;

//       // Send the PDF data as binary
//       res.setHeader("Content-Type", "application/pdf");
//       res.send(pdfData);
//     } else {
//       res.status(404).send("PDF not found");
//     }
//   } catch (error) {
//     console.error("Error retrieving PDF:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// router.get("/:id", async (req, res) => {
// router.get("/:id/files", async (req, res) => {
//   const merchantId = req.params.id;

//   try {
//     // Query the database to get all PDF data for the given merchant_id
//     const result = await pool.query(
//       "SELECT pdf_data FROM coupon WHERE merchant_id = $1",
//       [merchantId]
//     );

//     if (result.rows.length > 0) {
//       const pdfDataArray = result.rows.map((row) => row.pdf_data);

//       // Set the Content-Type header to indicate that the response is a JSON
//       res.setHeader("Content-Type", "application/json");
//       // Send the array of PDF data as a JSON response
//       res.status(200).json(pdfDataArray);
//     } else {
//       // Set the Content-Type header to indicate that the response is a JSON
//       res.setHeader("Content-Type", "application/json");
//       res.status(404).json({ message: "No PDFs found for the given merchant" });
//     }
//   } catch (error) {
//     console.error("Error retrieving PDFs:", error);
//     // Set the Content-Type header to indicate that the response is a JSON
//     res.setHeader("Content-Type", "application/json");
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

router.get("/:id", async (req, res) => {
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

  const queryText =
    "SELECT pdf_data, filename, front_view_pdf, back_view_pdf FROM coupon WHERE merchant_id = $1";

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

router.post("/", upload.single("pdf"), (req, res) => {
  console.log(req.body);

  const pdfData = req.file.buffer;
  console.log("pdfData = ", pdfData);
  const filename = req.file.originalname;
  console.log("filename = ", filename);
  const frontViewPdf = req.body.front_view_pdf;
  console.log("frontViewPdf = ", frontViewPdf);
  const backViewPdf = req.body.back_view_pdf;
  console.log("backViewPdf = ", backViewPdf);
  // After successful upload
  const fileUrl = `/api/coupon/pdf/${filename}`;

  // Handle PDF data as needed (e.g., store in the database)
  pool
    .query("INSERT INTO coupon (pdf_data, filename) VALUES ($1, $2)", [
      pdfData,
      filename,
    ])
    .then(() => {
      res.status(200).send({ message: "PDF uploaded successfully!", fileUrl });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error uploading PDF");
    });
});

// POST route for uploading front view PDF
router.post("/front/:id", upload.single("pdf"), (req, res) => {
  const frontViewPdf = req.file.buffer;
  const filename = req.file.originalname;
  const merchantId = req.params.id;

  // Insert the filename and merchantId into the database
  pool
    .query(
      "INSERT INTO coupon (filename, front_view_pdf, merchant_id) VALUES ($1, $2, $3)",
      [filename, frontViewPdf, merchantId]
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
router.post("/back/:id", upload.single("pdf"), (req, res) => {
  const merchantId = req.params.id;
  const backViewPdf = req.file.buffer;
  const filename = req.file.originalname;

  // Insert the filename and merchantId into the database
  pool
    .query(
      "INSERT INTO coupon (filename, merchant_id, back_view_pdf) VALUES ($1, $2, $3)",
      [filename, merchantId, backViewPdf]
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
