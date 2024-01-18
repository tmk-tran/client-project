const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Get route for fundraisers and group details
router.post('/:id', (req, res) => {
  const id = req.params.id
  const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJpYXQiOjE3MDU0MzA2NjMsIm5iZiI6MTcwNTQzMDY2MywianRpIjoiYzA3ZWNlMGEtNjdmYS00NjBiLThmOGQtZjc3M2NlNDk5OWY2IiwiZXhwIjoxNzA1NTE3MDYzLCJzdWIiOnsicm9sZWlkIjoyMDMzNiwidGVuYW50aWQiOjEwMTIxfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.Af36SYvSr6U3MO7sIRQKYlK9vf1xrphIsIdt50e7nz7oI2LEFLA42Q9MyiL0tN84YjfMYPNmkm3j7gPgnAlGkLO6ANBj4h9UVSdTYXqElXD3TkRiJ4Gduf_J2wQCpEhewL7oBzBotxT-3BIFszGluwujCSW7afoQUH6YkpjVEIP0KaP6";
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n  group (filter: "group_id = ${id}, desc"){\r\n id\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_photo\r\n group_description\r\n is_deleted\r\n fundraiser_collection{\r\n id\r\n group_id\r\n title\r\n description\r\n  requested_book_quantity\r\n book_quantity_checked_out\r\n book_checked_out_total_value\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n}\r\n}\r\n}`;

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
  //Old get route code
  // const queryText = `SELECT * FROM "group" WHERE "id" = $1;`;

  // pool.query(queryText, [id])
  // .then(result => {
  //   res.send(result.rows);
  // })
  // .catch(err =>{
  //   console.log("Error getting group details", err);
  //   res.sendStatus(500)
  // })
});

//GET route for groups for specific organizations
router.post("/orggroups/:id", (req, res) => {
  const id = req.params.id;
  const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJpYXQiOjE3MDU0MzA2NjMsIm5iZiI6MTcwNTQzMDY2MywianRpIjoiYzA3ZWNlMGEtNjdmYS00NjBiLThmOGQtZjc3M2NlNDk5OWY2IiwiZXhwIjoxNzA1NTE3MDYzLCJzdWIiOnsicm9sZWlkIjoyMDMzNiwidGVuYW50aWQiOjEwMTIxfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.Af36SYvSr6U3MO7sIRQKYlK9vf1xrphIsIdt50e7nz7oI2LEFLA42Q9MyiL0tN84YjfMYPNmkm3j7gPgnAlGkLO6ANBj4h9UVSdTYXqElXD3TkRiJ4Gduf_J2wQCpEhewL7oBzBotxT-3BIFszGluwujCSW7afoQUH6YkpjVEIP0KaP6";
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n  group (filter: "organization_id = ${id}"){\r\n id\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_photo\r\n group_description\r\n is_deleted\r\n}\r\n}`;

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
  //Old get route code
  // const queryText = `SELECT * FROM "group" WHERE "organization_id" = $1;`;

  // pool.query(queryText, [id])
  // .then(result => {
  //     res.send(result.rows);
  // })
  // .catch(err => {
  //     console.log("Error fetching organization groups", err)
  // })
})

//Post route for groups
// Rewritten for use with Devii, old node code commented out below


router.post("/newgroup", (req, res) => {
  const newGroup = req.body;
  //May need to ask if this format is correct for creating stuff
  const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJpYXQiOjE3MDU0MzA2NjMsIm5iZiI6MTcwNTQzMDY2MywianRpIjoiYzA3ZWNlMGEtNjdmYS00NjBiLThmOGQtZjc3M2NlNDk5OWY2IiwiZXhwIjoxNzA1NTE3MDYzLCJzdWIiOnsicm9sZWlkIjoyMDMzNiwidGVuYW50aWQiOjEwMTIxfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.Af36SYvSr6U3MO7sIRQKYlK9vf1xrphIsIdt50e7nz7oI2LEFLA42Q9MyiL0tN84YjfMYPNmkm3j7gPgnAlGkLO6ANBj4h9UVSdTYXqElXD3TkRiJ4Gduf_J2wQCpEhewL7oBzBotxT-3BIFszGluwujCSW7afoQUH6YkpjVEIP0KaP6";
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n  mutation{\r\n create_group(\r\n input: {\r\n organization_id: ${newGroup.organization_id}\r\n department: ${newGroup.department}\r\n sub_department: ${newGroup.sub_department}\r\n group_nickname: ${newGroup.group_nickname}\r\n group_photo: ${newGroup.group_photo}\r\n group_description: ${newGroup.group_description}\r\n is_deleted: false\r\n}\r\n) {\r\n id\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_photo\r\n group_description\r\n is_deleted}}\r\n}`;

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
})

//Old post route code for adding a group

// const newGroup = req.body;
// const queryText = `INSERT INTO "group" ("organization_id", "department", "sub_department", "group_nickname", "group_photo", "group_description")
// VALUES ($1, $2, $3, $4, $5, $6);`

// pool.query(queryText, [newGroup.organization_id, newGroup.department, newGroup.sub_department, newGroup.group_nickname, newGroup.group_photo, newGroup.group_description])
// .then(() => {
//   res.sendStatus(201);
// })
// .catch((err) => {
//   console.log("Error adding new group", err);
//   res.sendStatus(500);
// })
// });

//New update route that can be used to update general information or is_delete column probably
router.post("/update/:id", (req, res) => {
  const id = req.params.id;
  const updatedGroup = req.body;
  const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJpYXQiOjE3MDU0MzA2NjMsIm5iZiI6MTcwNTQzMDY2MywianRpIjoiYzA3ZWNlMGEtNjdmYS00NjBiLThmOGQtZjc3M2NlNDk5OWY2IiwiZXhwIjoxNzA1NTE3MDYzLCJzdWIiOnsicm9sZWlkIjoyMDMzNiwidGVuYW50aWQiOjEwMTIxfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.Af36SYvSr6U3MO7sIRQKYlK9vf1xrphIsIdt50e7nz7oI2LEFLA42Q9MyiL0tN84YjfMYPNmkm3j7gPgnAlGkLO6ANBj4h9UVSdTYXqElXD3TkRiJ4Gduf_J2wQCpEhewL7oBzBotxT-3BIFszGluwujCSW7afoQUH6YkpjVEIP0KaP6";
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n  mutation{\r\n create_group(\r\n input: {\r\n organization_id: ${updatedGroup.organization_id}\r\n department: ${updatedGroup.department}\r\n sub_department: ${updatedGroup.sub_department}\r\n group_nickname: ${updatedGroup.group_nickname}\r\n group_photo: ${updatedGroup.group_photo}\r\n group_description: ${updatedGroup.group_description}\r\n is_deleted: ${updatedGroup.is_deleted}\r\n}\r\n id: ${id}\r\n \r\n) {\r\n id\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_photo\r\n group_description\r\n is_deleted\r\n}\r\n}\r\n}`;

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
})

//Original update route
//PUT route to update group department/sub-department, title, nickname, photo, and description
// router.put('/:id', (req, res) => {
//     const id = req.params.id;
//     const updatedGroup = req.body;
//     const queryText = `UPDATE "group" SET "department" = $1, "sub_department" = $2, "group_nickname" = $3, "group_photo" = $4, "group_description" = $5 WHERE "id" = $6;`;

//     pool.query(queryText, [updatedGroup.department, updatedGroup.sub_department, updatedGroup.group_nickname, updatedGroup.group_photo, updatedGroup.group_description, id])
//     .then(() => {
//         res.sendStatus(200)
//     })
//     .catch((err) => {
//         console.log("Error updating group", err);
//         res.sendStatus(500);
//     })
// })

//Origional put route to update is_deleted column
//PUT route to update the soft delete for a group
// router.put('/delete/:id', (req, res) => {
//     const id = req.params.id;
//     const queryText = `UPDATE "group" SET "is_deleted" = 'true' WHERE "id" = $1`

//     pool.query(queryText, [id])
//     .then(() => {
//         res.sendStatus(200)
//     })
//     .catch((err) => {
//         console.log("Error in marking group as deleted", err);
//         res.sendStatus(500)
//     })
// })


module.exports = router;