import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";


 
export let auth_response = "";

// Auth queries
export function authLogin(user){

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
      console.log(result)
      auth_response = result
      console.log(auth_response)
    })
    .catch((error) => {
      console.log("error", error);
    });
}

// export function fetchUser(){
// const ACCESS_TOKEN = auth_response.access_token;
// const QUERY_URL = auth_response.routes.query;
// const query = `{\r\n user{\r\n id\r\n username\r\n password\r\n is_admin\r\n is_deleted\r\n}\r\n}`;
// console.log(query);

// const client = new ApolloClient({
//   uri: queryUrl,
//   headers: {
//     Authorization: `Bearer ${ACCESS_TOKEN}`,
//   },
//   cache: new InMemoryCache(),
// });

// client
//   .query({
//     query: gql`
//       query user{
//         ${query}
//       }
//     `,
//     variables: {},
//   })
//   .then((result) => {
//     return {
//       data: result.data.user,
//     };
//   })
//   .catch((error) => {
//     throw new Error(error);
//   });
// }

// const AUTH_URL = "https://api.devii.io/auth";

// var formdata = new FormData();
// formdata.append("login", "demo_user");
// formdata.append("password", "demouser");
// formdata.append("tenantid", "179");

// var requestOptions = {
//   method: "POST",
//   body: formdata,
//   redirect: "follow",
// };

// fetch(AUTH_URL, requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));

// // Anon auth url
// const ANON_AUTH_URL = "https://api.devii.io/anonauth";

// var formdata = new FormData();
// formdata.append("tenantid", "1111");

// var requestOptions = {
//   method: "POST",
//   body: formdata,
//   redirect: "follow",
// };

// fetch(AUTH_URL, requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));


// // Roles query
// const ACCESS_TOKEN = auth_response.access_token;
// const ROLES_PBAC = auth_response.routes.roles_pbac;
// const query = "{\r\n  role {\r\n    roleid\r\n    name\r\n  }\r\n}";

// var myHeaders = new Headers();
// myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
// myHeaders.append("Content-Type", "application/json");

// var graphql = JSON.stringify({
//   query: query,
//   variables: {},
// });
// var requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: graphql,
//   redirect: "follow",
// };

// fetch(ROLES_PBAC, requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));

// // ORGANIZATION QUERIES:
// // Get all organizations
export function allOrgs() {
const ACCESS_TOKEN = auth_response.access_token;
const QUERY_URL = "https://api.devii.io/query";
const query = `organization(ordering: "group_collection.organization_id"){\r\n id\r\n organization_name\r\n type\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n primary_contact_phone\r\n primary_contact_email\r\n organization_logo\r\n is_deleted\r\n organization_earnings\r\n organization_notes_collection {\r\n organization_id\r\n note_date\r\n note_content\r\n is_deleted\r\n}\r\n group_collection{\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_description\r\n is_deleted\r\n fundraiser_collection{\r\n id\r\n group_id\r\n title\r\n description\r\n requested_book_quantity\r\n book_quantity_checked_out\r\n book_checked_out_total_value\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n}\r\n}\r\n}`;

const client = new ApolloClient({
  uri: QUERY_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
  cache: new InMemoryCache(),
});

client
  .query({ 
    query: gql`
      query {
        ${query}
      }
    `,
    variables: {},
  })
  .then((result) => {
    return {
      data: result.data.organization,
    };
  })
  .catch((error) => {
    throw new Error(error);
  });
}

// //get a specific org
// function oneOrg() {
//   const id = id;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\organization (filter: "id =${id} "){\r\n  id\r\n  organization_name\r\n  type\r\n  address\r\n  city\r\n  state\r\n  zip\r\n  primary_contact_first_name\r\n  primary_contact_last_name\r\n  primary_contact_phone\r\n  primary_contact_email\r\n  organization_logo\r\n  is_deleted\r\n  organization_earnings\r\n  organization_notes_collection{\r\n organization_id\r\nnote_date\r\nnote_content\r\nis_deleted\r\n }\r\n  group_collection{\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_description\r\n is_deleted\r\n fundraiser_collection{\r\n  goal\r\n}\r\n}\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }

// //Adds a new organization
// function newOrg() {
//   const organization = organization; //REPLACE THIS PROBABLY
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = auth_response.routes.query;
//   const query = `{\r\n    mutation{\r\n
//         create_organization(\r\n
//           input: {\r\n
//               organization_name: ${organization.organization_name}\r\n
//             type: ${organization.type}\r\n
//             address: ${organization.address}\r\n
//             city: ${organization.city}\r\n
//             state: ${organization.state}\r\n
//             zip: ${organization.zip}\r\n
//             primary_contact_first_name: ${organization.primary_contact_first_name}\r\n
//             primary_contact_last_name: ${organization.primary_contact_last_name}\r\n
//             primary_contact_phone:${organization.primary_contact_phone}\r\n
//             primary_contact_email: ${organization.primary_contact_email}\r\n
//             organization_logo: ${organization.organization_logo}\r\n
//             is_deleted: ${organization.is_deleted}\r\n
//             organization_earnings: ${organization.organization_earnings}\r\n
//           }\r\n
//         )  {\r\n
//           organization_name\r\n
//           type\r\n
//           address\r\n
//           city\r\n
//           state\r\n
//           zip\r\n
//           primary_contact_first_name\r\n
//           primary_contact_last_name\r\n
//           primary_contact_phone\r\n
//           primary_contact_email\r\n
//           organization_logo\r\n
//           is_deleted\r\n
//           organization_earnings\r\n
//         }\r\n
//       }
//       \r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }

// // Update and existing org, to be used for all updates including is_deleted
// // function newOrg() {
// //   const organization = organization;
// //   const id = req.params.id
// //   const ACCESS_TOKEN = auth_response.access_token;
// //   const QUERY_URL = "https://api.devii.io/query";
// //   const query = `{\r\n    mutation{\r\n
// //       update_organization(\r\n
// //         input: {\r\n
// //             organization_name: ${organization.organization_name}\r\n
// //           type: ${organization.type}\r\n
// //           address: ${organization.address}\r\n
// //           city: ${organization.city}\r\n
// //           state: ${organization.state}\r\n
// //           zip: ${organization.zip}\r\n
// //           primary_contact_first_name: ${organization.primary_contact_first_name}\r\n
// //           primary_contact_last_name: ${organization.primary_contact_last_name}\r\n
// //           primary_contact_phone:${organization.primary_contact_phone}\r\n
// //           primary_contact_email: ${organization.primary_contact_email}\r\n
// //           organization_logo: ${organization.organization_logo}\r\n
// //           is_deleted: ${organization.is_deleted}\r\n
// //           organization_earnings: ${organization.organization_earnings}\r\n
// //         }\r\n
// //         id: ${id}
// //       )  {\r\n
// //         organization_name\r\n
// //         type\r\n
// //         address\r\n
// //         city\r\n
// //         state\r\n
// //         zip\r\n
// //         primary_contact_first_name\r\n
// //         primary_contact_last_name\r\n
// //         primary_contact_phone\r\n
// //         primary_contact_email\r\n
// //         organization_logo\r\n
// //         is_deleted\r\n
// //         organization_earnings\r\n
// //       }\r\n
// //     }
// //     \r\n}`;

// //   var myHeaders = new Headers();
// //   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
// //   myHeaders.append("Content-Type", "application/json");

// //   var graphql = JSON.stringify({
// //     query: query,
// //     variables: {},
// //   });
// //   var requestOptions = {
// //     method: "POST",
// //     headers: myHeaders,
// //     body: graphql,
// //     redirect: "follow",
// //   };

// //   fetch(QUERY_URL, requestOptions)
// //     .then((response) => response.text())
// //     .then((result) => console.log(result))
// //     .catch((error) => console.log("error", error));
// // }
// //ARCHIVED ORGANIZATION QUERIES:
// //get archived orgs
// function getArchivedOrgs() {
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n      organization (ordering: "group_collection.organization_id" filter: "is_deleted = true"){\r\n
//       id\r\n
//       organization_name\r\n
//       type\r\n
//       address\r\n
//       city\r\n
//       state\r\n
//       zip\r\n
//       primary_contact_first_name\r\n
//       primary_contact_last_name\r\n
//       primary_contact_phone\r\n
//       primary_contact_email\r\n
//       organization_logo\r\n
//       is_deleted\r\n
//       organization_earnings\r\n
//       organization_notes_collection {\r\n
//         organization_id\r\n
//         note_date\r\n
//         note_content\r\n
//         is_deleted\r\n
//       }\r\n
//       group_collection {\r\n
//         organization_id\r\n
//         department\r\n
//         sub_department\r\n
//         group_nickname\r\n
//         group_description\r\n
//         is_deleted\r\n
//         fundraiser_collection{\r\n
//           id\r\n
//           group_id\r\n
//           title\r\n
//           description\r\n
//           requested_book_quantity\r\n
//           book_quantity_checked_out\r\n
//           book_checked_out_total_value\r\n
//           book_quantity_checked_in\r\n
//           books_sold\r\n
//           money_received\r\n
//           start_date\r\n
//           end_date\r\n
//           coupon_book_id\r\n
//           outstanding_balance\r\n
//           is_deleted\r\n
//           closed\r\n
//           goal\r\n
//         }\r\n
//         }\r\n
//         }\r\n
//     Aggregates{\r\n
//       total_groups: count(subquery: "query{group{id organization_id}}")\r\n
//        total_fundraisers: count(subquery: "query{fundraiser{id group_id}}" ordering: "group_id")\r\n
//       total_open_fundraisers: count(subquery: "query{group{organization_id{fundraiser_collection{group_id}}}" \r\n
//         filter: " fundraiser_collection.closed=false"  ordering: "group_id")\r\n
//       total_closed_fundraisers: count(subquery: "query{group{organization_id fundraiser_collection{group_id}}}" \r\n
//         filter: " fundraiser_collection.closed=true" 
//         ordering: "group_id")\r\n
//       total_books_sold: sum(subquery: "query{fundraiser{books_sold group_id}}" 
//         ordering: "id") \r\n
//        total_outstanding_balance: sum(subquery: "query{fundraiser{outstanding_balance group_id}}" 
//         ordering: "id")\r\n
//       total_books_checked_out: count
//       (subquery: "query{group{organization_id fundraiser_collection{group_id book_quantity_checked_out}}}" \r\n
//         filter: " fundraiser_collection.closed=false" 
//         ordering: "group_id")\r\n
//        total_books_checked_in: count
//       (subquery: "query{group{ organization_id fundraiser_collection{group_id book_quantity_checked_in}}}" \r\n
//         filter: " fundraiser_collection.closed=false" 
//         ordering: "group_id")\r\n
//     }\r\n
//   \r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }

// //update archived orgs, used to update is_deleted to false
// function updateArchivedOrg() {
//   const organization = req.body;
//   const id = req.params.id
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n    mutation{\r\n
//       update_organization(\r\n
//         input: {\r\n
//             organization_name: ${organization.organization_name}\r\n
//           type: ${organization.type}\r\n
//           address: ${organization.address}\r\n
//           city: ${organization.city}\r\n
//           state: ${organization.state}\r\n
//           zip: ${organization.zip}\r\n
//           primary_contact_first_name: ${organization.primary_contact_first_name}\r\n
//           primary_contact_last_name: ${organization.primary_contact_last_name}\r\n
//           primary_contact_phone:${organization.primary_contact_phone}\r\n
//           primary_contact_email: ${organization.primary_contact_email}\r\n
//           organization_logo: ${organization.organization_logo}\r\n
//           is_deleted: ${organization.is_deleted}\r\n
//           organization_earnings: ${organization.organization_earnings}\r\n
//         }\r\n
//         id: ${id}
//       )  {\r\n
//         organization_name\r\n
//         type\r\n
//         address\r\n
//         city\r\n
//         state\r\n
//         zip\r\n
//         primary_contact_first_name\r\n
//         primary_contact_last_name\r\n
//         primary_contact_phone\r\n
//         primary_contact_email\r\n
//         organization_logo\r\n
//         is_deleted\r\n
//         organization_earnings\r\n
//       }\r\n
//     }
//     \r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }


// //ORGANIZATION NOTES QUERIES:
// // Get org notes
// function getOrgNotes() {
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n    organization_notes {\r\n id\r\n organization_id\r\n note_date\r\n note_content\r\n is_deleted\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// // post a new note
// function newOrgNote() {
//   const note = note;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n    mutation{\r\n create_organization_notes(\r\n input: {\r\n  organization_id: ${note.organization_id}\r\n note_date: ${note.note_date}\r\n note_content: ${note.note_content}\r\n is_deleted: false\r\n}\r\n){\r\n id\r\n organization_id\r\n note_date\r\n note_content\r\n is_deleted\r\n}\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //Update an org note, used for all updates
// function updateOrgNote() {
//   const updatedNote = req.body;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n    mutation{\r\n update_organization_notes(\r\n input: {\r\n  organization_id: ${updatedNote.organization_id}\r\n updatedNote_date: ${updatedNote.updatedNote_date}\r\n note_content: ${updatedNote.note_content}\r\n is_deleted: false\r\n} id: ${id}\r\n){\r\n id\r\n organization_id\r\n note_date\r\n note_content\r\n is_deleted\r\n}\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }

// //GROUP QUERIES:
// //get all groups
// function getAllGroups() {
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = "{\r\n  group{\r\n id\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_photo\r\n group_description\r\n is_deleted\r\n }\r\n}";

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }

// //get group details
// function getGroupDetails() {
//   const id = id;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n  group (filter: "group_id = ${id}, desc"){\r\n id\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_photo\r\n group_description\r\n is_deleted\r\n fundraiser_collection{\r\n id\r\n group_id\r\n title\r\n description\r\n  requested_book_quantity\r\n book_quantity_checked_out\r\n book_checked_out_total_value\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n}\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }

// //get group by organization_id
// function getOrgGroups() {
//   const orgId = organization_id;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n  group (filter: "organization_id = ${orgId}"){\r\n id\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_photo\r\n group_description\r\n is_deleted\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }

// //Create a new group
// function newGroup() {
//   const newGroup = group;
//   //May need to ask if this format is correct for creating stuff
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n  mutation{\r\n create_group(\r\n input: {\r\n organization_id: ${newGroup.organization_id}\r\n department: ${newGroup.department}\r\n sub_department: ${newGroup.sub_department}\r\n group_nickname: ${newGroup.group_nickname}\r\n group_photo: ${newGroup.group_photo}\r\n group_description: ${newGroup.group_description}\r\n is_deleted: false\r\n}\r\n) {\r\n id\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_photo\r\n group_description\r\n is_deleted}}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }

// //Update a group, can be used for all updates including is_deleted
// function updateGroup() {
//   const id = id;
//   const updatedGroup = req.body;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n  mutation{\r\n create_group(\r\n input: {\r\n organization_id: ${updatedGroup.organization_id}\r\n department: ${updatedGroup.department}\r\n sub_department: ${updatedGroup.sub_department}\r\n group_nickname: ${updatedGroup.group_nickname}\r\n group_photo: ${updatedGroup.group_photo}\r\n group_description: ${updatedGroup.group_description}\r\n is_deleted: ${updatedGroup.is_deleted}\r\n}\r\n id: ${id}\r\n \r\n) {\r\n id\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_photo\r\n group_description\r\n is_deleted\r\n}\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //FUNDRAISER QUERIES:
// //get all fundraisers, filter by group's orgaization id
// function getFundraisers() {
//   const orgId = organization_id;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n   fundraiser (filter: "group.organization_id = ${orgId}"{\r\n id\r\n group_id\r\n title\r\n description\r\n requested_book_quantity\r\n book_quantity_checked_out\r\n book_checked_out_total_value\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n
//   group {\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_photo\r\n group_description\r\n is_deleted\r\n organization{\r\n organization_name\r\n type\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n primary_contact_phone\r\n primary_contact_email\r\n organization_logo\r\n is_deleted\r\n organization_earnings\r\n}\r\n}\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //get fundraisers filtered by group id
// function getGroupFundraisers() {
//   const groupId = group_id;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n   fundraiser (filter: "group_id = ${groupId}"{\r\n id\r\n group_id\r\n title\r\n description\r\n requested_book_quantity\r\n book_quantity_checked_out\r\n book_checked_out_total_value\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n
//   group {\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_photo\r\n group_description\r\n is_deleted\r\n organization{\r\n organization_name\r\n type\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n primary_contact_phone\r\n primary_contact_email\r\n organization_logo\r\n is_deleted\r\n organization_earnings\r\n}\r\n}\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //Creates a new fundraiser
// function createFundraiser() {
//   const newFundraiser = fundraiser;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n  mutation{\r\n create_fundraiser(\r\n input:{\r\n group_id: ${newFundraiser.group_id}\r\n title: ${newFundraiser.title}\r\n description: ${newFundraiser.description}\r\n requested_book_quantity: ${newFundraiser.requested_book_quantity}\r\n book_quantity_checked_out: ${newFundraiser.book_quantity_checked_out}\r\n book_quantity_checked_in: ${newFundraiser.book_quantity_checked_in}\r\n books_sold: ${newFundraiser.books_sold}\r\n money_received: ${newFundraiser.money_received}\r\n start_date: ${newFundraiser.start_date}\r\n end_date: ${newFundraiser.end_data}\r\n coupon_book_id: ${newFundraiser.coupon_book_id}\r\n goal: ${newFundraiser.goal}\r\n }\r\n ){\r\n id\r\n group_id\r\n title\r\n description\r\n photo\r\n requested_book_quantity\r\n book_quantity_checked_out\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //Update fundraiser, can be used for all updates including is_deleted
// function updateFundraiser() {
//   const id = id;
//   const updatedFundraiser = updatedFundraiser;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n  mutation{\r\n update_fundraiser(\r\n input:{\r\n  title: ${updatedFundraiser.newTitle}\r\n book_quantity_checked_out: ${updatedFundraiser.newBookCheckedOut}\r\n book_quantity_checked_in: ${updatedFundraiser.newBooksCheckedIn}\r\n books_sold: ${updatedFundraiser.newBooksSold}\r\n money_received: ${updatedFundraiser.newMoneyReceived}\r\n is_deleted: ${updatedFundraiser.is_deleted}\r\n closed: ${updatedFundraiser.closed}\r\n goal: ${updatedFundraiser.newGoal}\r\n}\r\n id: ${id}\r\n ){\r\n id\r\n group_id\r\n title\r\n description\r\n photo\r\n requested_book_quantity\r\n book_quantity_checked_out\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n}\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //COUPON BOOK QUERIES:
// //get coupon books:
// function getCouponBooks() {
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = "{\r\n coupon_book{\r\n id\r\n year\r\n}\r\n}";

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //add a coupon book
// function newCouponBook() {
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const year = req.body;
//   const query = `{\r\n mutation{\r\n create_coupon_book(\r\n input:{ \r\n year: ${year}\r\n }\r\n){\r\n id\r\n year\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }

// //ALL USERS FOR ADMIN TABLE:
// //get all users:
// function allUsers() {
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = "{\r\n    user {\r\n id\r\n username\r\n password\r\n is_admin\r\n is_deleted\r\n user_group_collection{\r\n id\r\n group_id\r\n user_id\r\n group_admin\r\n}\r\n}\r\n}";

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }

// //MERCHANT QUERIES:
// //get all merchants
// function getMerchants() {
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = "{\r\n  merchant{\r\n id\r\n buisness_id\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n contact_phone_number\r\n contact_email\r\n is_deleted\r\n}\r\n}";

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //get merchant details by id
// function merchantDetails() {
//   const id = id;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n  merchant(filter: "id = ${id}){\r\n id\r\n buisness_id\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n contact_phone_number\r\n contact_email\r\n is_deleted\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //Create a merchant
// function createMerchant() {
//   const newMerchant = merchant;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n  mutation{\r\n  create_coupon(\r\n input:{\r\n buisness_id: ${newMerchant.business_id}\r\n address: ${newMerchant.address}\r\n city: ${newMerchant.city}\r\n state: ${newMerchant.state}\r\n zip: ${newMerchant.zip}\r\n primary_contact_first_name: ${newMerchant.primary_contact_first_name}\r\n primary_contact_last_name: ${newMerchant.primary_contact_last_name}\r\n contact_phone_number: ${newMerchant.contact_phone_number}\r\n contact_email: ${newMerchant.contact_email}\r\n }\r\n){\r\n merchant{\r\n id\r\n buisness_id\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n contact_phone_number\r\n contact_email\r\n is_deleted\r\n}\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //Update a merchant, used for all updates including is_deleted
// function updateMerchant() {
//   const id = id;
//   const updatedMerchant = updatedMerchant;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n  mutation{\r\n  update_coupon(\r\n input:{\r\n buisness_id: ${updatedMerchant.business_id}\r\n address: ${updatedMerchant.address}\r\n city: ${updatedMerchant.city}\r\n state: ${updatedMerchant.state}\r\n zip: ${updatedMerchant.zip}\r\n primary_contact_first_name: ${updatedMerchant.primary_contact_first_name}\r\n primary_contact_last_name: ${updatedMerchant.primary_contact_last_name}\r\n contact_phone_number: ${updatedMerchant.contact_phone_number}\r\n contact_email: ${updatedMerchant.contact_email}\r\n is_deleted: ${updatedMerchant.is_deleted}\r\n} id: ${id}\r\n){\r\n merchant{\r\n id\r\n buisness_id\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n contact_phone_number\r\n contact_email\r\n is_deleted\r\n}\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }

// //BUSINESS QUERIES:
// //get all businesses:
// function fetchAllBusiness() {
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = "{\r\n  business{\r\n id\r\n business_name\r\n}\r\n}";

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //get business by id:
// function getBusiness() {
//   const id = id;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n  business(filter: "id = ${id}) {\r\n id\r\n business_name\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //create a business
// function createBusiness() {
//   const newBusiness = req.body;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n mutation{ create_buiness(\r\n business{\r\n business_name: ${newBusiness.business_name}\r\n}\r\n){\r\n id\r\n business_name\r\n}\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //update business, this is for all updates including is_deleted
// function updateBusiness() {
//   const id = id;
//   const updatedBusiness = updatedBusiness;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n mutation{ create_buiness(\r\n business{\r\n business_name: ${updatedBusiness.business_name}\r\n} id: ${id} \r\n){\r\n id\r\n business_name\r\n}\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //REGIONS QUERIES:
// //get all regions:
// function getRegions() {
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = "{\r\n    region{\r\n id\r\n region_name\r\n location_collection{\r\n  location_name\r\n address\r\n city\r\n state\r\n zip\r\n coordinates\r\n region_id\r\n is_deleted\r\n}\r\n geom{\r\n srid\r\n wkt\r\n centroid\r\n envelope\r\n}\r\n}\r\n}";

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //Create a region:
// function createRegion() {
//   const newRegion = newRegion;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n mutation{\r\n create_region(\r\n input:{\r\n region_name: ${newRegion.name}\r\n} \r\n){\r\n id\r\n region_name\r\n \r\n}`;


//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //Update region, used for all updates
// function updateRegion() {
//   const id = req.params.id;
//   const updatedRegion = req.body;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n mutation{\r\n update_region(\r\n input:{\r\n region_name: ${updatedRegion.name}\r\n} id: ${id} \r\n){\r\n id\r\n region_name\r\n \r\n}`;


//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //LOCATION QUERIES:
// //get all location:
// function getLocations() {
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = "{\r\n  location{\r\n id\r\n location_name\r\n address\r\n city\r\n state\r\n zip\r\n coordinates\r\n region_id\r\n is_deleted\r\n }\r\n}";

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //get location details by id
// function getLocationDetails() {
//   const id = id;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n  location(filter: "id = ${id}){\r\n id\r\n location_name\r\n address\r\n city\r\n state\r\n zip\r\n coordinates\r\n region_id\r\n is_deleted\r\n }\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //create new location
// function newLocation() {
//   const newLocation = newLocation;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n  mutation{\r\n  create_coupon(\r\n input:{\r\n location_name: ${newLocation.location_name}\r\n address: ${newLocation.address}\r\n city: ${newLocation.city}\r\n state: ${newLocation.state}\r\n zip: ${newLocation.zip}\r\n coordinates: ${newLocation.coordinates}\r\n region_id: ${newLocation.region_id}\r\n is_deleted: ${newLocation.is_deleted}\r\n}\r\n){\r\n id\r\n location_name\r\n address\r\n city\r\n state\r\n zip\r\n coordinates\r\n region_id\r\n is_deleted\r\n }\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //Update location by id, can be used for all updates including is_deleted
// function updateLocation() {
//   const id = id;
//   const updatedLocation = updatedLocation;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n  mutation{\r\n  update_coupon(\r\n input:{\r\n location_name: ${updatedLocation.location_name}\r\n address: ${updatedLocation.address}\r\n city: ${updatedLocation.city}\r\n state: ${updatedLocation.state}\r\n zip: ${updatedLocation.zip}\r\n coordinates: ${updatedLocation.coordinates}\r\n region_id: ${updatedLocation.region_id}\r\n is_deleted: ${updatedLocation.is_deleted}\r\n} id: ${id}\r\n){\r\n id\r\n location_name\r\n address\r\n city\r\n state\r\n zip\r\n coordinates\r\n region_id\r\n is_deleted\r\n }\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //COUPON QUERIES:
// //get coupons
// function getCoupons() {
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = "{\r\n  coupon{\r\n id\r\n description\r\n current_status\r\n time_stamp\r\n file_name\r\n file_storage_key\r\n is_deleted\r\n }\r\n}";

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //create new coupon:
// function newCoupon() {
//   const newCoupon = newCoupon;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n  mutation{\r\n  create_coupon(\r\n input:{\r\n description: ${newCoupon.description}\r\n current_status: ${newCoupon.current_status}\r\n time_stamp: ${newCoupon.time_stamp}\r\n file_name: ${newCoupon.file_name}\r\n file_storage_key: ${newCoupon.file_storage_key}\r\n }\r\n){\r\n id\r\n description\r\n current_status\r\n time_stamp\r\n file_name\r\n file_storage_key\r\n is_deleted \r\n}\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }
// //update coupon, used for all updates to the coupon
// function updateCoupon() {
//   const id = id;
//   const updatedCoupon = updatedCoupon;
//   const ACCESS_TOKEN = auth_response.access_token;
//   const QUERY_URL = "https://api.devii.io/query";
//   const query = `{\r\n  mutation{\r\n  update_coupon(\r\n input:{\r\n description: ${updatedCoupon.description}\r\n current_status: ${updatedCoupon.current_status}\r\n time_stamp: ${updatedCoupon.time_stamp}\r\n file_name: ${updatedCoupon.file_name}\r\n file_storage_key: ${updatedCoupon.file_storage_key}\r\n is_deleted: ${updatedCoupon.is_deleted}\r\n}\r\n id:${id}\r\n){\r\n id\r\n description\r\n current_status\r\n time_stamp\r\n file_name\r\n file_storage_key\r\n is_deleted \r\n}\r\n}\r\n}`;

//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
//   myHeaders.append("Content-Type", "application/json");

//   var graphql = JSON.stringify({
//     query: query,
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(QUERY_URL, requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }

