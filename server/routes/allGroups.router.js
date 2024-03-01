const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//New post route to Devii api to get all groups



//Old get route for all groups
Get route for ALL groups
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


// //Old get route for all groups
// //Get route for ALL groups
// // router.get('/', (req, res) => {
// //   const id = req.params.id
// // const queryText = `SELECT * FROM "group";`;

// // pool.query(queryText)
// // .then(result => {
// //   res.send(result.rows);
// // })
// // .catch(err =>{
// //   console.log("Error getting group details", err);
// //   res.sendStatus(500)
// // })
// // });


// module.exports = router;
module.exports = router;
