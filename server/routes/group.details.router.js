const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Get route for fundraisers and group details
// router.post('/:id', (req, res) => {
 

//GET route for groups for specific organizations


//Post route for groups
// Rewritten for use with Devii, old node code commented out below


// router.post("/newgroup", (req, res) => {
 

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