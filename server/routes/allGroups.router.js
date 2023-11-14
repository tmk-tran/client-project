const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Get route for ALL groups
router.get('/', (req, res) => {
  const id = req.params.id
const queryText = `SELECT * FROM "group";`;

pool.query(queryText)
.then(result => {
  res.send(result.rows);
})
.catch(err =>{
  console.log("Error getting group details", err);
  res.sendStatus(500)
})
});


module.exports = router;