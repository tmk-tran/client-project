

function auth() {
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
}

function anonAuth() {
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
}

function query() {
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
       .then((result) => {console.log(result);
      res.sendStatus(200)})
      .catch((error) => {console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
  };