import axios from "axios";

async function auth() {
    try {
        // Login to Devii
        const config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };
      
        const AUTH_URL = "https://api.devii.io/auth";
      
        const params = new URLSearchParams();
        params.append("login", "demo_user");
        params.append("password", "demo_password");
        params.append("tenantid", "1111");
      
        const result = await axios.post(AUTH_URL, params, config);
        console.log(result);
      
        const access_token = result.data.access_token;
        const query_endpoint = result.data.routes.query;
        const role_pbac_endpoint = result.data.routes.roles_pbac;
      } catch (e) {
        console.log(e);
        return;
      }
}

async function anonAuth() {

    try {
        // Login to Devii
        const config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };
      
        const AUTH_URL = "https://api.devii.io/anonauth";
      
        const params = new URLSearchParams();
        params.append("tenantid", "1111");
      
        const result = await axios.post(AUTH_URL, params, config);
        console.log(result);
      
        const access_token = result.data.access_token;
        const query_endpoint = result.data.routes.query;
        const role_pbac_endpoint = result.data.routes.roles_pbac;
      } catch (e) {
        console.log(e);
        return;
      }
}

async function pbacQuery() {
    const ACCESS_TOKEN = auth_response.access_token;
const ROLES_PBAC = auth_response.routes.roles_pbac;
const query = "{\r\n  role {\r\n    roleid\r\n    name\r\n  }\r\n}";

const queryConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

const data = new FormData();
data.append("query", query);
data.append("variables", `{}`);

const result = await axios.post(ROLES_PBAC, data, queryConfig);
}

async function query() {
    const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJpYXQiOjE3MDU0MzA2NjMsIm5iZiI6MTcwNTQzMDY2MywianRpIjoiYzA3ZWNlMGEtNjdmYS00NjBiLThmOGQtZjc3M2NlNDk5OWY2IiwiZXhwIjoxNzA1NTE3MDYzLCJzdWIiOnsicm9sZWlkIjoyMDMzNiwidGVuYW50aWQiOjEwMTIxfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.Af36SYvSr6U3MO7sIRQKYlK9vf1xrphIsIdt50e7nz7oI2LEFLA42Q9MyiL0tN84YjfMYPNmkm3j7gPgnAlGkLO6ANBj4h9UVSdTYXqElXD3TkRiJ4Gduf_J2wQCpEhewL7oBzBotxT-3BIFszGluwujCSW7afoQUH6YkpjVEIP0KaP6";
const QUERY_URL = "https://api.devii.io/query";
const query = "{\r\n  query allgroups{\r\n group{\r\n id\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_photo\r\n group_description\r\n is_deleted\r\n }\r\n}\r\n}";

const queryConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

const data = new FormData();
data.append("query", query);
data.append("variables", `{}`);

const result = await axios.post(QUERY_URL, data, queryConfig);
}