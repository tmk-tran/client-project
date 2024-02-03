const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/:id", rejectUnauthenticated, (req, res) => {
  const orgId = req.params.id;
  console.log(orgId);

  const queryText = `SELECT * FROM organization_tasks WHERE organization_id = $1 ORDER BY due_date ASC;`;
  pool
    .query(queryText, [orgId])
    .then((result) => {
      console.log("FROM orgTask.router: ", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in the GET / request for authorized users", err);
      res.sendStatus(500);
    });
});


module.exports = router;
