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
  const queryText = "SELECT * FROM merchant";

  pool
    .query(queryText)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error fetching data from the 'merchant' table");
    });
});

router.post("/", upload.single("pdf"), (req, res) => {
  console.log(req.body);
  // Extract business_name from the request body
  const { business_name } = "test";

  // Ensure business_name is defined
  //   if (!business_name) {
  //     return res.status(400).send("business_name is required");
  //   }
  const pdfData = req.file.buffer;
  const filename = req.file.originalname;
  // After successful upload
  const fileUrl = `/api/merchant/pdf/${filename}`;

  // Handle PDF data as needed (e.g., store in the database)
  pool
    .query(
      "INSERT INTO merchant (business_name, pdf_data, filename) VALUES ($1, $2, $3)",
      [business_name, pdfData, filename]
    )
    .then(() => {
      res.status(200).send("PDF uploaded successfully!", fileUrl);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error uploading PDF");
    });
});

module.exports = router;
