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
  console.log("pdfData = ", pdfData);
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
// router.get("/:id", (req, res) => {
//   const couponId = req.params.id;

//   // Query the database to get the PDF data by ID
//   pool
//     .query("SELECT pdf_data FROM coupon WHERE id = $1", [couponId])
//     .then((result) => {
//       if (result.rows.length > 0) {
//         const pdfData = result.rows[0].pdf_data;

//         // Send the PDF data as binary
//         res.setHeader("Content-Type", "application/pdf");
//         res.send(pdfData);
//       } else {
//         res.status(404).send("PDF not found");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).send("Error retrieving PDF");
//     });
// });

router.get("/:id", async (req, res) => {
  const couponId = req.params.id;

  try {
    // Query the database to get the PDF data by ID
    const result = await pool.query(
      "SELECT pdf_data FROM coupon WHERE id = $1",
      [couponId]
    );

    if (result.rows.length > 0) {
      const pdfData = result.rows[0].pdf_data;

      // Send the PDF data as binary
      res.setHeader("Content-Type", "application/pdf");
      res.send(pdfData);
    } else {
      res.status(404).send("PDF not found");
    }
  } catch (error) {
    console.error("Error retrieving PDF:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", upload.single("pdf"), (req, res) => {
  console.log(req.body);

  const pdfData = req.file.buffer;
  console.log("pdfData = ", pdfData);
  const filename = req.file.originalname;
  console.log("filename = ", filename);
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

module.exports = router;
