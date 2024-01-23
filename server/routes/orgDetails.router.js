const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * Get all of the details for an organization
 */
router.post("/:id", (req, res) => {
  const id = req.params.id;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\organization (filter: "id =${id} "){\r\n  id\r\n  organization_name\r\n  type\r\n  address\r\n  city\r\n  state\r\n  zip\r\n  primary_contact_first_name\r\n  primary_contact_last_name\r\n  primary_contact_phone\r\n  primary_contact_email\r\n  organization_logo\r\n  is_deleted\r\n  organization_earnings\r\n  organization_notes_collection{\r\n organization_id\r\nnote_date\r\nnote_content\r\nis_deleted\r\n }\r\n  group_collection{\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_description\r\n is_deleted\r\n fundraiser_collection{\r\n  goal\r\n}\r\n}\r\n}\r\n}`;

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
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      res.sendStatus(200)
    })
    .catch((error) => {
      console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
  //   const queryText = `SELECT
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
  //   pool
  //     .query(queryText, [orgId])
  //     .then((result) => {
  //       // console.log("orgId = ", orgId);
  //       console.log("FROM orgDetails.router: ", result.rows);
  //       res.send(result.rows);
  //     })
  //     .catch((err) => {
  //       console.log("error in the GET / request for authorized users", err);
  //       res.sendStatus(500);
  //     });
});

/**
 * Update an organization
 */
router.post("/:id", (req, res) => {
  const organization = req.body;
  console.log("ORGANIZATION = ", organization);

  // Org Details
  const orgName = organization.organization_name;
  const type = organization.type;
  const address = organization.address;
  const city = organization.city;
  const state = organization.state;
  const zip = organization.zip;

  // Org Contact Details
  const firstName = organization.primary_contact_first_name;
  const lastName = organization.primary_contact_last_name;
  const phone = organization.primary_contact_phone;
  const email = organization.primary_contact_email;
  const orgId = organization.organization_id;

  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n mutation{\r\n
    create_organization(\r\n
      input: {\r\n
        organization_name: ${orgName}\r\n
        type: ${type}\r\n
        address: ${address}\r\n
        city: ${city}\r\n
        state: ${state}\r\n
        zip: ${zip}\r\n
        primary_contact_first_name: ${firstName}\r\n
        primary_contact_last_name: ${lastName}\r\n
        primary_contact_phone: ${phone}\r\n
        primary_contact_email: ${email}\r\n
        organization_logo: "optional string"\r\n
      }\r\n
      id:${orgId}\r\n
    )  {\r\n
      organization_name\r\n
      type\r\n
      address\r\n
      city\r\n
      state\r\n
      zip\r\n
      primary_contact_first_name\r\n
      primary_contact_last_name\r\n
      primary_contact_phone\r\n
      primary_contact_email\r\n
      organization_logo\r\n
      is_deleted\r\n
      organization_earnings\r\n
    }\r\n
  }\r\n
  `;

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

  // // const user = req.user.id;
  // const queryText = `UPDATE "organization" SET organization_name = $1, type = $2, address = $3, city = $4, state = $5, zip = $6, primary_contact_first_name = $7, primary_contact_last_name = $8, primary_contact_phone = $9, primary_contact_email = $10 WHERE id = $11;`;
  // pool
  //   .query(queryText, [
  //     orgName,
  //     type,
  //     address,
  //     city,
  //     state,
  //     zip,
  //     firstName,
  //     lastName,
  //     phone,
  //     email,
  //     orgId,
  //   ])
  //   .then((response) => {
  //     res.sendStatus(200);
  //   })
  //   .catch((err) => {
  //     console.log("error saving to database", err);
  //     res.sendStatus(500);
  //   });
});

module.exports = router;
