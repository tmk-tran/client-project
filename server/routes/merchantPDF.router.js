const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const { upload } = require("../modules/upload")

router.post("/pdf", upload.single("pdf"), (req, res) => {
  const pdfData = req.file.buffer;
  const filename = req.file.originalname;

  // Handle PDF data as needed (e.g., store in the database)
  pool
    .query("INSERT INTO merchant (pdf_data, filename) VALUES ($1, $2)", [
      pdfData,
      filename,
    ])
    .then(() => {
      res.status(200).send("PDF uploaded successfully!");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error uploading PDF");
    });
});

module.exports = router;
