const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
// const userRouter = require('./routes/user.router');
// const groupRouter = require('./routes/group.details.router');
// const orgDetailsRouter = require('./routes/orgDetails.router');
// const organizationsRouter = require('./routes/organizations.router');
// const fundraisersRouter = require('./routes/fundraisers.router')
// const archivedOrganizationsRouter = require('./routes/archivedOrganizations.router');
// const allGroupsRouter = require('./routes/allGroups.router');
// const couponBookRouter = require('./routes/couponbook.router');
// const groupAdminRouter = require('./routes/groupAdmin.router');
// const orgNotesRouter = require('./routes/orgNotes.router');
// const allUsersRouter = require('./routes/allUsers.router');
// const businessRouter = require('./routes/business.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
// app.use('/api/user', userRouter);
// app.use('/api/group', groupRouter)
// app.use('/api/orgnotes', orgNotesRouter);
// app.use('/api/orgdetails', orgDetailsRouter);
// app.use('/api/organizations', organizationsRouter);
// app.use('/api/fundraisers', fundraisersRouter)
// app.use('/api/archivedOrganizations', archivedOrganizationsRouter);
// app.use('/api/allGroups', allGroupsRouter);
// app.use('/api/archivedOrganizations', archivedOrganizationsRouter);
// app.use('/api/couponbook', couponBookRouter);
// app.use('/api/groupAdmin', groupAdminRouter);
// app.use('/api/allUsers', allUsersRouter);
// app.use('/api/business', businessRouter);

let auth_response = '';
app.post("/api/user/login", (req, res) => {
  const user = req.body;
  const AUTH_URL = "https://api.devii.io/auth";

  var formdata = new FormData();
  formdata.append("login", `${user.username}`);
  formdata.append("password", `${user.password}`);
  formdata.append("tenantid", `10121`);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(AUTH_URL, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      auth_response = result;
      console.log(auth_response.access_token)
      res.sendStatus(200)
    })
    .catch((error) => {
      console.log("error", error);
      res.sendStatus(500)
    });
});
//FETCH USER!!!!!:
app.post("/api/user/", (req, res) => {
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n    user{ \r\n id\r\n username\r\n password\r\n is_admin\r\n is_deleted\r\n}\r\n}`;

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
      res.send(result.data.user[0])
    })
    .catch((error) => {
      console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
});


// Anon auth url
app.post("/api/user/anon", (req, res) => {
  const ANON_AUTH_URL = "https://api.devii.io/anonauth";

  var formdata = new FormData();
  formdata.append("tenantid", "1111");

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(ANON_AUTH_URL, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
});

app.post("/api/roles/", (req, res) => {
  const ACCESS_TOKEN = auth_response.access_token;
  const ROLES_PBAC = auth_response.routes.roles_pbac;
  const query = "{\r\n  role {\r\n    roleid\r\n    name\r\n  }\r\n}";

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

  fetch(ROLES_PBAC, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
});
//ORGANIZATION QUERIES:
//all orgs query
app.post("/api/organizations", (req, res) => {
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n organization(ordering: "group_collection.organization_id"){\r\n id\r\n organization_name\r\n type\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n primary_contact_phone\r\n primary_contact_email\r\n organization_logo\r\n is_deleted\r\n organization_earnings\r\n organization_notes_collection {\r\n organization_id\r\n note_date\r\n note_content\r\n is_deleted\r\n}\r\n group_collection {\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_description\r\n is_deleted\r\n fundraiser_collection{\r\n id\r\n group_id\r\n title\r\n description\r\n requested_book_quantity\r\n book_quantity_checked_out\r\n book_checked_out_total_value\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n}\r\n}\r\n}\r\n}`;

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
      res.send(result.data.organization)
    })
    .catch((error) => {
      console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
});
//Create a new organization
app.post("api/organization/neworg", (req, res) => {
  const organization = req.body;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n mutation{\r\n create_organization(\r\n input: {\r\n  organization_name: ${organization.organization_name}\r\n type: ${organization.type}\r\n address: ${organization.address}\r\n city: ${organization.city}\r\n state: ${organization.state}\r\n zip: ${organization.zip}\r\n primary_contact_first_name: ${organization.primary_contact_first_name}\r\n primary_contact_last_name: ${organization.primary_contact_last_name}\r\n primary_contact_phone:${organization.primary_contact_phone}\r\n primary_contact_email: ${organization.primary_contact_email}\r\n organization_logo: ${organization.organization_logo}\r\n is_deleted: ${organization.is_deleted}\r\n organization_earnings: ${organization.organization_earnings}\r\n }\r\n )  {\r\n organization_name\r\n type\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n primary_contact_phone\r\n primary_contact_email\r\n organization_logo\r\n is_deleted\r\n organization_earnings\r\n }\r\n}\r\n}`;

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
    .catch((error) => {
      console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    })
})
//Update an organization, used for all updates
app.post("/api/organization/:id", (req, res) => {
  const organization = req.body;
  const id = req.params.id
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n    mutation{\r\n
      update_organization(\r\n
        input: {\r\n
            organization_name: ${organization.organization_name}\r\n
          type: ${organization.type}\r\n
          address: ${organization.address}\r\n
          city: ${organization.city}\r\n
          state: ${organization.state}\r\n
          zip: ${organization.zip}\r\n
          primary_contact_first_name: ${organization.primary_contact_first_name}\r\n
          primary_contact_last_name: ${organization.primary_contact_last_name}\r\n
          primary_contact_phone:${organization.primary_contact_phone}\r\n
          primary_contact_email: ${organization.primary_contact_email}\r\n
          organization_logo: ${organization.organization_logo}\r\n
          is_deleted: ${organization.is_deleted}\r\n
          organization_earnings: ${organization.organization_earnings}\r\n
        }\r\n
        id: ${id}
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
    }
    \r\n}`;

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
    .then((result) => console.log(result))
    .catch((error) => {
      console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
});

app.post("/api/orgDetails/:id", (req, res) => {
  const id = req.params.id;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n organization (filter: "id =${id} "){\r\n  id\r\n  organization_name\r\n  type\r\n  address\r\n  city\r\n  state\r\n  zip\r\n  primary_contact_first_name\r\n  primary_contact_last_name\r\n  primary_contact_phone\r\n  primary_contact_email\r\n  organization_logo\r\n  is_deleted\r\n  organization_earnings\r\n  organization_notes_collection{\r\n organization_id\r\nnote_date\r\nnote_content\r\nis_deleted\r\n }\r\n  group_collection{\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_description\r\n is_deleted\r\n fundraiser_collection{\r\n  goal\r\n}\r\n}\r\n}\r\n}`;

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
      res.send(result.data.organization)
    })
    .catch((error) => {
      console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
});
//Update an organization
app.post("/api/orgDetails/update/:id", (req, res) => {
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
});
//ORGANIZATION NOTES QUERIES:
//get all notes for secific org
app.post('/api/orgNotes/:id', (req, res) => {
  const id = req.params.id
  let ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n    organization_notes(filter: "organization_id = ${id}") {\r\n id\r\n organization_id\r\n note_date\r\n note_content\r\n is_deleted\r\n}\r\n}`;

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
      console.log(result.data.organization_notes)
      res.send(result.data.organization_notes)
    })
    .catch((error) => {
      console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });

});

//add a new note:
app.post("api/orgNotes/newnote", (req, res) => {
  const note = req.body;
  const ACCESS_TOKEN = auth_response.access_token;
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
    .catch((error) => {
      console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
})

//Update a note, used for all updates including is_deleted
app.post("api/orgNotes/update/:id", (req, res) => {
  const updatedNote = req.body;
  const ACCESS_TOKEN = auth_response.access_token;
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
    .catch((error) => {
      console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
});

//ARCHIVED ORGANIZATIONS QUERIES:
//fetch archived orgs :
app.get("/api/archivedOrganizations", (req, res) => {
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n      organization (ordering: "group_collection.organization_id" filter: "is_deleted = true"){\r\n
      id\r\n
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
      organization_notes_collection {\r\n
        organization_id\r\n
        note_date\r\n
        note_content\r\n
        is_deleted\r\n
      }\r\n
      group_collection {\r\n
        organization_id\r\n
        department\r\n
        sub_department\r\n
        group_nickname\r\n
        group_description\r\n
        is_deleted\r\n
        fundraiser_collection{\r\n
          id\r\n
          group_id\r\n
          title\r\n
          description\r\n
          requested_book_quantity\r\n
          book_quantity_checked_out\r\n
          book_checked_out_total_value\r\n
          book_quantity_checked_in\r\n
          books_sold\r\n
          money_received\r\n
          start_date\r\n
          end_date\r\n
          coupon_book_id\r\n
          outstanding_balance\r\n
          is_deleted\r\n
          closed\r\n
          goal\r\n
        }\r\n
        }\r\n
        }\r\n
    Aggregates{\r\n
      total_groups: count(subquery: "query{group{id organization_id}}")\r\n
       total_fundraisers: count(subquery: "query{fundraiser{id group_id}}" ordering: "group_id")\r\n
      total_open_fundraisers: count(subquery: "query{group{organization_id{fundraiser_collection{group_id}}}" \r\n
        filter: " fundraiser_collection.closed=false"  ordering: "group_id")\r\n
      total_closed_fundraisers: count(subquery: "query{group{organization_id fundraiser_collection{group_id}}}" \r\n
        filter: " fundraiser_collection.closed=true" 
        ordering: "group_id")\r\n
      total_books_sold: sum(subquery: "query{fundraiser{books_sold group_id}}" 
        ordering: "id") \r\n
       total_outstanding_balance: sum(subquery: "query{fundraiser{outstanding_balance group_id}}" 
        ordering: "id")\r\n
      total_books_checked_out: count
      (subquery: "query{group{organization_id fundraiser_collection{group_id book_quantity_checked_out}}}" \r\n
        filter: " fundraiser_collection.closed=false" 
        ordering: "group_id")\r\n
       total_books_checked_in: count
      (subquery: "query{group{ organization_id fundraiser_collection{group_id book_quantity_checked_in}}}" \r\n
        filter: " fundraiser_collection.closed=false" 
        ordering: "group_id")\r\n
    }\r\n
  \r\n}`;

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
      console.log(result)
      res.sendStatus(200)
    })
    .catch((error) => {
      console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
});
//Update an archived organization, used mostly for is_deleted:
app.post("/api/archivedOrganizations/:id", (req, res) => {
  const organization = req.body;
  const id = req.params.id
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n    mutation{\r\n
      update_organization(\r\n
        input: {\r\n
            organization_name: ${organization.organization_name}\r\n
          type: ${organization.type}\r\n
          address: ${organization.address}\r\n
          city: ${organization.city}\r\n
          state: ${organization.state}\r\n
          zip: ${organization.zip}\r\n
          primary_contact_first_name: ${organization.primary_contact_first_name}\r\n
          primary_contact_last_name: ${organization.primary_contact_last_name}\r\n
          primary_contact_phone:${organization.primary_contact_phone}\r\n
          primary_contact_email: ${organization.primary_contact_email}\r\n
          organization_logo: ${organization.organization_logo}\r\n
          is_deleted: ${organization.is_deleted}\r\n
          organization_earnings: ${organization.organization_earnings}\r\n
        }\r\n
        id: ${id}
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
    }
    \r\n}`;

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
    .catch((error) => {
      console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
});
// GROUP QUERIES:
//all groups fetch:
app.post("/api/allGroups/:id", (req, res) => {
  const organization = req.body;
  const id = req.params.id
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n    mutation{\r\n
      update_organization(\r\n
        input: {\r\n
            organization_name: ${organization.organization_name}\r\n
          type: ${organization.type}\r\n
          address: ${organization.address}\r\n
          city: ${organization.city}\r\n
          state: ${organization.state}\r\n
          zip: ${organization.zip}\r\n
          primary_contact_first_name: ${organization.primary_contact_first_name}\r\n
          primary_contact_last_name: ${organization.primary_contact_last_name}\r\n
          primary_contact_phone:${organization.primary_contact_phone}\r\n
          primary_contact_email: ${organization.primary_contact_email}\r\n
          organization_logo: ${organization.organization_logo}\r\n
          is_deleted: ${organization.is_deleted}\r\n
          organization_earnings: ${organization.organization_earnings}\r\n
        }\r\n
        id: ${id}
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
    }
    \r\n}`;

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
    .catch((error) => {
      console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
});
//group details fetch filtered by group_id:
app.post('/api/group/:id', (req, res) => {
  const id = req.params.id
  const ACCESS_TOKEN = auth_response.access_token;
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
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      res.sendStatus(200)
    })
    .catch((error) => {
      console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
});

//group details fetch filtered by organization_id:
app.post("/api/group/orggroups/:id", (req, res) => {
  const id = req.params.id;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n  group (filter: "organization_id = ${id}"){\r\n id\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_photo\r\n group_description\r\n is_deleted\r\n}\r\n}`;

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
  myHeaders.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    query: query,
    variables: {}
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
      console.log("org groups result", result);
      res.sendStatus(200)
    })
    .catch((error) => {
      console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
});

//create a new group:
app.post("/api/group/newgroup", (req, res) => {
  const newGroup = req.body;
  //May need to ask if this format is correct for creating stuff
  const ACCESS_TOKEN = auth_response.access_token;
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

//update a group:
app.post("/api/group/update/:id", (req, res) => {
  const id = req.params.id;
  const updatedGroup = req.body;
  const ACCESS_TOKEN = auth_response.access_token;
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
});
// FUNDRAISER QUERIES:
//get fundraisers filtered by group.organization_id:
app.post("/api/fundraisers/:id", (req, res) => {
  const orgId = req.params.id;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n   fundraiser (filter: "group.organization_id = ${orgId}"){\r\n id\r\n group_id\r\n title\r\n description\r\n requested_book_quantity\r\n book_quantity_checked_out\r\n book_checked_out_total_value\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n
  group {\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_photo\r\n group_description\r\n is_deleted\r\n organization{\r\n organization_name\r\n type\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n primary_contact_phone\r\n primary_contact_email\r\n organization_logo\r\n is_deleted\r\n organization_earnings\r\n}\r\n}\r\n}\r\n}`;

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
      console.log(result.data.fundraiser);
      res.send(result.data.fundraiser)
    })
    .catch((error) => {
      console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
});

//get fundraisers filtered by group_id:
app.post("/api/fundraisers/groupfundraisers/:id", (req, res) => {
  const groupId = req.params.id;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n   fundraiser (filter: "group_id = ${groupId}") {\r\n id\r\n group_id\r\n title\r\n description\r\n requested_book_quantity\r\n book_quantity_checked_out\r\n book_checked_out_total_value\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n
    group {\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_photo\r\n group_description\r\n is_deleted\r\n organization{\r\n organization_name\r\n type\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n primary_contact_phone\r\n primary_contact_email\r\n organization_logo\r\n is_deleted\r\n organization_earnings\r\n}\r\n}\r\n}\r\n}`;

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
      console.log( "fundraiser result", result);
      res.send(200)
    })
    .catch((error) => {
      console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
});

//create a new fundraiser
app.post("/api/fundraisers", (req, res) => {
  const newFundraiser = req.body;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n  mutation{\r\n create_fundraiser(\r\n input:{\r\n group_id: ${newFundraiser.group_id}\r\n title: ${newFundraiser.title}\r\n description: ${newFundraiser.description}\r\n requested_book_quantity: ${newFundraiser.requested_book_quantity}\r\n book_quantity_checked_out: ${newFundraiser.book_quantity_checked_out}\r\n book_quantity_checked_in: ${newFundraiser.book_quantity_checked_in}\r\n books_sold: ${newFundraiser.books_sold}\r\n money_received: ${newFundraiser.money_received}\r\n start_date: ${newFundraiser.start_date}\r\n end_date: ${newFundraiser.end_data}\r\n coupon_book_id: ${newFundraiser.coupon_book_id}\r\n goal: ${newFundraiser.goal}\r\n }\r\n ){\r\n id\r\n group_id\r\n title\r\n description\r\n photo\r\n requested_book_quantity\r\n book_quantity_checked_out\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n}\r\n}`;

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
});

// update a fundraiser:
app.post("/api/fundraisers/updatedfundraiser/:id", (req, res) => {
  const id = req.params.id;
  const updatedFundraiser = req.body;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n  mutation{\r\n update_fundraiser(\r\n input:{\r\n  title: ${updatedFundraiser.newTitle}\r\n book_quantity_checked_out: ${updatedFundraiser.newBookCheckedOut}\r\n book_quantity_checked_in: ${updatedFundraiser.newBooksCheckedIn}\r\n books_sold: ${updatedFundraiser.newBooksSold}\r\n money_received: ${updatedFundraiser.newMoneyReceived}\r\n is_deleted: ${updatedFundraiser.is_deleted}\r\n closed: ${updatedFundraiser.closed}\r\n goal: ${updatedFundraiser.newGoal}\r\n}\r\n id: ${id}\r\n ){\r\n id\r\n group_id\r\n title\r\n description\r\n photo\r\n requested_book_quantity\r\n book_quantity_checked_out\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n}\r\n}\r\n}`;

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
//COUPON BOOK QUERIES:
//fetch coupon book years:
app.post("/api/couponbook/", (req, res) => {
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = "{\r\n coupon_book{\r\n id\r\n year\r\n}\r\n}";

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
})
//add new coupon book
app.post("/api/couponbook/newcouponbook", (req, res) => {
  const ACCESS_TOKEN = accessToken;
  const QUERY_URL = "https://api.devii.io/query";
  const year = req.body;
  const query = `{\r\n mutation{\r\n create_coupon_book(\r\n input:{ \r\n year: ${year}\r\n }\r\n){\r\n id\r\n year\r\n}\r\n}`;

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
//ALL USERS QUERIES:
//fetch all users:
app.post("/api/allUsers", (req, res) => {
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = "{\r\n    user {\r\n id\r\n username\r\n password\r\n is_admin\r\n is_deleted\r\n user_group_collection{\r\n id\r\n group_id\r\n user_id\r\n group_admin\r\n}\r\n}\r\n}";

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
})
//REGION QUERIES:
// fetch all regions:
app.post("/api/regions/", (req, res) => {
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = "{\r\n    region{\r\n id\r\n region_name\r\n location_collection{\r\n  location_name\r\n address\r\n city\r\n state\r\n zip\r\n coordinates\r\n region_id\r\n is_deleted\r\n}\r\n geom{\r\n srid\r\n wkt\r\n centroid\r\n envelope\r\n}\r\n}\r\n}";

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
});

//Post route to create a new region via Devii api
app.post("/api/regions/new", (req, res) => {
  const newRegion = req.body;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n mutation{\r\n create_region(\r\n input:{\r\n region_name: ${newRegion.name}\r\n} \r\n){\r\n id\r\n region_name\r\n \r\n}`;


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
});
//Post route to update a region via Devii api
app.post("/api/regions/update/:id", (req, res) => {
  const id = req.params.id;
  const updatedRegion = req.body;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n mutation{\r\n update_region(\r\n input:{\r\n region_name: ${updatedRegion.name}\r\n} id: ${id} \r\n){\r\n id\r\n region_name\r\n \r\n}`;


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
});

//BUSINESS QUERIES:
//get all businesses:
app.post("/api/business/", (req, res) => {
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = "{\r\n  business{\r\n id\r\n business_name\r\n}\r\n}";

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
});
//create a new business
//Post route to create a new buisness vie Devii api
app.post("/api/business/new", (req, res) => {
  const newBusiness = req.body;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n mutation{ create_buiness(\r\n business{\r\n business_name: ${newBusiness.business_name}\r\n}\r\n){\r\n id\r\n business_name\r\n}\r\n}\r\n}`;

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
});
//Route to update a business via the Devii api
app.post("/api/business/update/:id", (req, res) => {
  const id = req.params.id
  const updatedBusiness = req.body;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n mutation{ create_buiness(\r\n business{\r\n business_name: ${updatedBusiness.business_name}\r\n} id: ${id} \r\n){\r\n id\r\n business_name\r\n}\r\n}\r\n}`;

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
});
//MERCHANT QUERIES:
//get all merchants
app.post("/api/merchants/", (req, res) => {
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = "{\r\n  merchant{\r\n id\r\n buisness_id\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n contact_phone_number\r\n contact_email\r\n is_deleted\r\n}\r\n}";

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
})
// Post route to creat a new merchant via the Devii api
app.post("/api/merchants/newmerchant", (req, res) => {
  const newMerchant = req.body;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n  mutation{\r\n  create_coupon(\r\n input:{\r\n buisness_id: ${newMerchant.business_id}\r\n address: ${newMerchant.address}\r\n city: ${newMerchant.city}\r\n state: ${newMerchant.state}\r\n zip: ${newMerchant.zip}\r\n primary_contact_first_name: ${newMerchant.primary_contact_first_name}\r\n primary_contact_last_name: ${newMerchant.primary_contact_last_name}\r\n contact_phone_number: ${newMerchant.contact_phone_number}\r\n contact_email: ${newMerchant.contact_email}\r\n }\r\n){\r\n merchant{\r\n id\r\n buisness_id\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n contact_phone_number\r\n contact_email\r\n is_deleted\r\n}\r\n}\r\n}`;

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
});
// Post route to update a merchant, can be used for all updates
app.post("/api/merchants/updatemerchant/:id", (req, res) => {
  const id = req.params.id;
  const updatedMerchant = req.body;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n  mutation{\r\n  update_coupon(\r\n input:{\r\n buisness_id: ${updatedMerchant.business_id}\r\n address: ${updatedMerchant.address}\r\n city: ${updatedMerchant.city}\r\n state: ${updatedMerchant.state}\r\n zip: ${updatedMerchant.zip}\r\n primary_contact_first_name: ${updatedMerchant.primary_contact_first_name}\r\n primary_contact_last_name: ${updatedMerchant.primary_contact_last_name}\r\n contact_phone_number: ${updatedMerchant.contact_phone_number}\r\n contact_email: ${updatedMerchant.contact_email}\r\n is_deleted: ${updatedMerchant.is_deleted}\r\n} id: ${id}\r\n){\r\n merchant{\r\n id\r\n buisness_id\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n contact_phone_number\r\n contact_email\r\n is_deleted\r\n}\r\n}\r\n}`;

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
});
//LOCATION QUERIES:
//fetch all locations
app.post("/api/locations/", (req, res) => {
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = "{\r\n  location{\r\n id\r\n location_name\r\n address\r\n city\r\n state\r\n zip\r\n coordinates\r\n region_id\r\n is_deleted\r\n }\r\n}";

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
});
// Post route to create a new location via Devii api
app.post("/api/locations/newlocation", (req, res) => {
  const newLocation = req.body;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n  mutation{\r\n  create_coupon(\r\n input:{\r\n location_name: ${newLocation.location_name}\r\n address: ${newLocation.address}\r\n city: ${newLocation.city}\r\n state: ${newLocation.state}\r\n zip: ${newLocation.zip}\r\n coordinates: ${newLocation.coordinates}\r\n region_id: ${newLocation.region_id}\r\n is_deleted: ${newLocation.is_deleted}\r\n}\r\n){\r\n id\r\n location_name\r\n address\r\n city\r\n state\r\n zip\r\n coordinates\r\n region_id\r\n is_deleted\r\n }\r\n}\r\n}`;

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
});
// Post route to update an existing location via Devii api
app.post("/api/locations/updatelocation/:id", (req, res) => {
  const id = req.params.id
  const updatedLocation = req.body;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n  mutation{\r\n  update_coupon(\r\n input:{\r\n location_name: ${updatedLocation.location_name}\r\n address: ${updatedLocation.address}\r\n city: ${updatedLocation.city}\r\n state: ${updatedLocation.state}\r\n zip: ${updatedLocation.zip}\r\n coordinates: ${updatedLocation.coordinates}\r\n region_id: ${updatedLocation.region_id}\r\n is_deleted: ${updatedLocation.is_deleted}\r\n} id: ${id}\r\n){\r\n id\r\n location_name\r\n address\r\n city\r\n state\r\n zip\r\n coordinates\r\n region_id\r\n is_deleted\r\n }\r\n}\r\n}`;

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
});
//COUPON QUERIES:
//Basic post route to fetch data for coupons via Devii api
app.post("/api/coupons/", (req, res) => {
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = "{\r\n  coupon{\r\n id\r\n description\r\n current_status\r\n time_stamp\r\n file_name\r\n file_storage_key\r\n is_deleted\r\n }\r\n}";

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
});
// Post route to add a new coupon via Devii api
app.post("/api/coupons/newcoupon", (req, res) => {
  const newCoupon = req.body
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n  mutation{\r\n  create_coupon(\r\n input:{\r\n description: ${newCoupon.description}\r\n current_status: ${newCoupon.current_status}\r\n time_stamp: ${newCoupon.time_stamp}\r\n file_name: ${newCoupon.file_name}\r\n file_storage_key: ${newCoupon.file_storage_key}\r\n }\r\n){\r\n id\r\n description\r\n current_status\r\n time_stamp\r\n file_name\r\n file_storage_key\r\n is_deleted \r\n}\r\n}\r\n}`;

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
// Post route to update a coupon via Devii api, can be used for all update purposes
app.post("/api/coupons/updatecoupon/:id", (req, res) => {
  const id = req.params.id
  const updatedCoupon = req.body
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n  mutation{\r\n  update_coupon(\r\n input:{\r\n description: ${updatedCoupon.description}\r\n current_status: ${updatedCoupon.current_status}\r\n time_stamp: ${updatedCoupon.time_stamp}\r\n file_name: ${updatedCoupon.file_name}\r\n file_storage_key: ${updatedCoupon.file_storage_key}\r\n is_deleted: ${updatedCoupon.is_deleted}\r\n}\r\n id:${id}\r\n){\r\n id\r\n description\r\n current_status\r\n time_stamp\r\n file_name\r\n file_storage_key\r\n is_deleted \r\n}\r\n}\r\n}`;

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



// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
