const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Get route for fundraisers and group details
router.get('/:id', (req, res) => {
    const id = req.params.id
  const queryText = `SELECT * FROM "group" WHERE "id" = $1;`;

  pool.query(queryText, id)
  .then(result => {
    res.send(result.rows);
  })
  .catch(err =>{
    console.log("Error getting group details", err);
    res.sendStatus(500)
  })
});
//GET route for groups for specific organizations
router.get("/orggroups/", (req, res) => {
    const orgId = req.body;
    const queryText = `SELECT * FROM "group" WHERE "organization_id" = $1;`;

    pool.query(queryText, [orgId])
    .then(result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log("Error fetching organization groups", err)
    })
})

//Post route for groups
router.post('/', (req, res) => {
//   const id = req.params.id;
  const newGroup = req.body;
  const queryText = `INSERT INTO "group" ("organization_id", "department", "sub_department", "group_nickname", "group_photo", "group_description")
  VALUES ($1, $2, $3, $4, $5, $6);`

  pool.query(queryText, [newGroup.organization_id, newGroup.department, newGroup.sub_department, newGroup.group_nickname, newGroup.group_photo, newGroup.group_desctiption])
  .then(() => {
    res.sendStatus(201);
  })
  .catch((err) => {
    console.log("Error adding new group", err);
    res.sendStatus(500);
  })
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedGroup = req.body;
    const queryText = `UPDATE "group" SET "department" = $1, "sub_department" = $2, "group_nickname" = $3, "group_photo" = $4, "group_description" = $5 WHERE "id" = $6;`;

    pool.query(queryText, [updatedGroup.department, updatedGroup.sub_department, updatedGroup.group_nickname, updatedGroup.group_photo, updatedGroup.group_desctiption, id])
    .then(() => {
        res.sendStatus(200)
    })
    .catch((err) => {
        console.log("Error updating group", err);
        res.sendStatus(500);
    })
})

router.put('/delete/:id', (req, res) => {
    const id = req.params.id;
    const queryText = `UPDATE "group" SET "is_deleted" = 'true' WHERE "id" = $1`

    pool.query(queryText, [id])
    .then(() => {
        res.sendStatus(200)
    })
    .catch((err) => {
        console.log("Error in marking group as deleted", err);
        res.sendStatus(500)
    })
})


module.exports = router;