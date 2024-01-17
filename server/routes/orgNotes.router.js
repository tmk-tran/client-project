const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//New route to get notes from Devii
router.post('/', async (req, res) => {
  const id = req.params.id
  const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJpYXQiOjE3MDU0MzA2NjMsIm5iZiI6MTcwNTQzMDY2MywianRpIjoiYzA3ZWNlMGEtNjdmYS00NjBiLThmOGQtZjc3M2NlNDk5OWY2IiwiZXhwIjoxNzA1NTE3MDYzLCJzdWIiOnsicm9sZWlkIjoyMDMzNiwidGVuYW50aWQiOjEwMTIxfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.Af36SYvSr6U3MO7sIRQKYlK9vf1xrphIsIdt50e7nz7oI2LEFLA42Q9MyiL0tN84YjfMYPNmkm3j7gPgnAlGkLO6ANBj4h9UVSdTYXqElXD3TkRiJ4Gduf_J2wQCpEhewL7oBzBotxT-3BIFszGluwujCSW7afoQUH6YkpjVEIP0KaP6";
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n    organization_notes (filter:'organization_id = ${id}'){\r\n id\r\n organization_id\r\n note_date\r\n note_content\r\n is_deleted\r\n}\r\n}`;
  
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
    .then((result) => console.log(result))
    .catch((error) => {console.log("Error getting data from Devii", error)
    res.sendStatus(500)
  });
    
  });
//Old get route for notes
// router.get("/:id", rejectUnauthenticated, (req, res) => {
//   const orgId = req.params.id;
//   console.log("orgId = ", orgId);
//   const queryText = `SELECT * FROM "organization_notes" WHERE organization_id = $1 ORDER by "id" DESC;`;
//   pool
//     .query(queryText, [orgId])
//     .then((result) => {
//       // console.log("orgId = ", orgId);
//       console.log("FROM orgNotes.router: ", result.rows);
//       res.send(result.rows);
//     })
//     .catch((err) => {
//       console.log("error in the GET / request for authorized users", err);
//       res.sendStatus(500);
//     });
// });

// New create query to create a new note using devii api
router.post("/newnote", (req, res) => {
  const note = req.body;
  const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJpYXQiOjE3MDU0MzA2NjMsIm5iZiI6MTcwNTQzMDY2MywianRpIjoiYzA3ZWNlMGEtNjdmYS00NjBiLThmOGQtZjc3M2NlNDk5OWY2IiwiZXhwIjoxNzA1NTE3MDYzLCJzdWIiOnsicm9sZWlkIjoyMDMzNiwidGVuYW50aWQiOjEwMTIxfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.Af36SYvSr6U3MO7sIRQKYlK9vf1xrphIsIdt50e7nz7oI2LEFLA42Q9MyiL0tN84YjfMYPNmkm3j7gPgnAlGkLO6ANBj4h9UVSdTYXqElXD3TkRiJ4Gduf_J2wQCpEhewL7oBzBotxT-3BIFszGluwujCSW7afoQUH6YkpjVEIP0KaP6";
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n    mutation{\r\n create_organization_notes(\r\n input: {\r\n  organization_id: ${note.organization_id}\r\n note_date: ${note.note_date}\r\n note_content: ${note.note_content}\r\n is_deleted: false\r\n}\r\n){\r\n id\r\n organization_id\r\n note_date\r\n note_content\r\n is_deleted\r\n}\r\n}\r\n}`;
  
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
    .then((result) => console.log(result))
    .catch((error) => {console.log("Error getting data from Devii", error)
    res.sendStatus(500)
  });
})

//Old post route to add a new note to the db
// router.post("/", rejectUnauthenticated, (req, res) => {
//   const note = req.body;
//   const orgId = note.organization_id;
//   const date = note.note_date;
//   const content = note.note_content;

//   const queryText = `INSERT INTO "organization_notes" ("organization_id", "note_date", "note_content")
//   VALUES ($1, $2, $3);`;

//   pool
//     .query(queryText, [orgId, date, content])
//     .then((response) => {
//       res.sendStatus(201);
//     })
//     .catch((err) => {
//       console.log("error in orgNotes POST route", err);
//       res.sendStatus(500);
//     });
// });

//New update route for use with Devii, can be used to update all info on a note
router.post("/:id", (req, res) => {
  const updatedNote = req.body;
  const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJpYXQiOjE3MDU0MzA2NjMsIm5iZiI6MTcwNTQzMDY2MywianRpIjoiYzA3ZWNlMGEtNjdmYS00NjBiLThmOGQtZjc3M2NlNDk5OWY2IiwiZXhwIjoxNzA1NTE3MDYzLCJzdWIiOnsicm9sZWlkIjoyMDMzNiwidGVuYW50aWQiOjEwMTIxfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.Af36SYvSr6U3MO7sIRQKYlK9vf1xrphIsIdt50e7nz7oI2LEFLA42Q9MyiL0tN84YjfMYPNmkm3j7gPgnAlGkLO6ANBj4h9UVSdTYXqElXD3TkRiJ4Gduf_J2wQCpEhewL7oBzBotxT-3BIFszGluwujCSW7afoQUH6YkpjVEIP0KaP6";
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n    mutation{\r\n update_organization_notes(\r\n input: {\r\n  organization_id: ${updatedNote.organization_id}\r\n updatedNote_date: ${updatedNote.updatedNote_date}\r\n note_content: ${updatedNote.note_content}\r\n is_deleted: false\r\n} id: ${id}\r\n){\r\n id\r\n organization_id\r\n note_date\r\n note_content\r\n is_deleted\r\n}\r\n}\r\n}`;
  
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
    .then((result) => console.log(result))
    .catch((error) => {console.log("Error getting data from Devii", error)
    res.sendStatus(500)
  });
})


//Original delete and update routes
// router.delete("/:id", (req, res) => {
//   const noteId = req.params.id;
//   console.log("noteId = ", noteId);
//   pool
//     .query(
//       `UPDATE "organization_notes"
//       SET is_deleted = true
//       WHERE id = $1;`,
//       [noteId]
//     )
//     .then((response) => {
//       res.sendStatus(200);
//     })
//     .catch((error) => {
//       console.log("Error with orgNotes DELETE route", error);
//       res.sendStatus(500);
//     });
// });

// router.put("/:id", rejectUnauthenticated, (req, res) => {
//   const note = req.body;
//   const orgId = req.params.id;

//   //   const user = req.user.id;
//   const date = note.note_date;
//   const content = note.note_content;
//   const queryText = `
//     UPDATE "organization_notes" SET note_date = $1, note_content = $2
//     WHERE
//         organization_id = $3;
//     `;
//   pool
//     .query(queryText, [date, content, orgId])
//     .then((response) => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.log("error with orgNotes PUT route", err);
//       res.sendStatus(500);
//     });
// });

module.exports = router;
