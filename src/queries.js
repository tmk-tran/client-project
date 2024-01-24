
// Auth queries

const AUTH_URL = "https://api.devii.io/auth";

var formdata = new FormData();
formdata.append("login", "demo_user");
formdata.append("password", "demouser");
formdata.append("tenantid", "179");

var requestOptions = {
  method: "POST",
  body: formdata,
  redirect: "follow",
};

fetch(AUTH_URL, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));

// Anon auth url
const ANON_AUTH_URL = "https://api.devii.io/anonauth";

var formdata = new FormData();
formdata.append("tenantid", "1111");

var requestOptions = {
  method: "POST",
  body: formdata,
  redirect: "follow",
};

fetch(AUTH_URL, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));


// Roles query
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

// ORGANIZATION QUERIES:
// Get all organizations
function allOrgs() {
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = auth_response.routes.query;
  const query = `{\r\n      organization (ordering: "group_collection.organization_id" ){\r\n
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
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

//get a specific org
function oneOrg() {
  const id = id;
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
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
}

//Adds a new organization
function newOrg() {
  const organization = organization; //REPLACE THIS PROBABLY
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = auth_response.routes.query;
  const query = `{\r\n    mutation{\r\n
        create_organization(\r\n
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
  .catch((error) => console.log("error", error));
    }

// Update and existing org, to be used for all updates including is_deleted
function newOrg () {
  const organization = organization;
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
  .catch((error) => console.log("error", error));
}

//ORGANIZATION NOTES QUERIES:
// Get org notes
function getOrgNotes () {
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n    organization_notes {\r\n id\r\n organization_id\r\n note_date\r\n note_content\r\n is_deleted\r\n}\r\n}`;

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
  .catch((error) => console.log("error", error));
}
// post a new note
function newOrgNote() {
  const note = note;
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
  .catch((error) => console.log("error", error));
}
//Update an org note, used for all updates
function updateOrgNote() {
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
  .catch((error) => console.log("error", error));
}

//GROUP QUERIES:
//get all groups
function getAllGroups() {
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = "{\r\n  group{\r\n id\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_photo\r\n group_description\r\n is_deleted\r\n }\r\n}";

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
  .catch((error) => console.log("error", error));
}

//get group details
function getGroupDetails() {
  const id = id;
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
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
}

//get group by organization_id
function getOrgGroups() {
  const orgId = organization_id;
  const ACCESS_TOKEN = auth_response.access_token;
  const QUERY_URL = "https://api.devii.io/query";
  const query = `{\r\n  group (filter: "organization_id = ${orgId}"){\r\n id\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_photo\r\n group_description\r\n is_deleted\r\n}\r\n}`;

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
  .catch((error) => console.log("error", error));
}

//Create a new group
function newGroup() {
  const newGroup = group;
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
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
}

//Update a group, can be used for all updates including is_deleted
function updateGroup() {
  const id = id;
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
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
}
