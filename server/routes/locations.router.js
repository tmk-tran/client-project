const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT
        *
    FROM
        "location"
    ORDER BY
        "id" DESC;
    `;

  pool
    .query(queryText)
    .then((result) => {
      console.log("FROM location.router: ", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in the GET / request for location info", err);
      res.sendStatus(500);
    });
});

router.post("/", rejectUnauthenticated, (req, res) => {
  const location = req.body;
  console.log("LOCATION IS: ", location);
  const locationName = location.location_name;
  const address = location.address;
  const city = location.city;
  const state = location.state;
  const zip = location.zip;
  const coordinates = location.coordinates;
  const regionId = location.region_id;

  const queryText = `INSERT INTO "location" ("location_name", "address", "city", "state", "zip", "coordinates", "region_id")
                                        VALUES ($1, $2, $3, $4, $5, $6, $7);`;

  pool
    .query(queryText, [
      locationName,
      address,
      city,
      state,
      zip,
      coordinates,
      regionId,
    ])
    .then((response) => {
      console.log("response from location.router: ", response.rows);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error in location POST route", err);
      res.sendStatus(500);
    });
});

module.exports = router;
