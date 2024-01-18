const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Post router to fetch business data via the Devii api
router.post("/", (req, res) => {
    const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJpYXQiOjE3MDU2MDcxMDEsIm5iZiI6MTcwNTYwNzEwMSwianRpIjoiMjRkYzcxNzMtOTM5Ny00OTg2LWEyMTMtNTY3MDA2Mzk0ODBjIiwiZXhwIjoxNzA1NjkzNTAxLCJzdWIiOnsicm9sZWlkIjoyMDMzNiwidGVuYW50aWQiOjEwMTIxfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.AOI_BqIkPtIIzVmLCzGWVMDGF1Mka9GV29mcPHyUXCOlb-tEwOv_r_5OoI7ZAN2eOObEOnXKEpxEoul4bptVnX1UATbzKAt843WebZJMhCznuFHTEKXqvu4m56wGQo9Yvb-DNW6fSPeCS9eV7jxD7Sc1yv6s735wZLdqrNFfDkwnDQfn";
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
      .then((response) => response.text())
       .then((result) => {console.log(result);
      res.sendStatus(200)})
      .catch((error) => {console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
});

//Post route to create a new buisness vie Devii api
router.post("/new", (req, res) => {
    const newBusiness = req.body;
    const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJpYXQiOjE3MDU0MzA2NjMsIm5iZiI6MTcwNTQzMDY2MywianRpIjoiYzA3ZWNlMGEtNjdmYS00NjBiLThmOGQtZjc3M2NlNDk5OWY2IiwiZXhwIjoxNzA1NTE3MDYzLCJzdWIiOnsicm9sZWlkIjoyMDMzNiwidGVuYW50aWQiOjEwMTIxfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.Af36SYvSr6U3MO7sIRQKYlK9vf1xrphIsIdt50e7nz7oI2LEFLA42Q9MyiL0tN84YjfMYPNmkm3j7gPgnAlGkLO6ANBj4h9UVSdTYXqElXD3TkRiJ4Gduf_J2wQCpEhewL7oBzBotxT-3BIFszGluwujCSW7afoQUH6YkpjVEIP0KaP6";
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
       .then((result) => {console.log(result);
      res.sendStatus(200)})
      .catch((error) => {console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
});

//Route to update a business via the Devii api
router.post("/update/:id", (req, res) => {
    const id = req.params.id
    const updatedBusiness = req.body;
    const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9.eyJpYXQiOjE3MDU0MzA2NjMsIm5iZiI6MTcwNTQzMDY2MywianRpIjoiYzA3ZWNlMGEtNjdmYS00NjBiLThmOGQtZjc3M2NlNDk5OWY2IiwiZXhwIjoxNzA1NTE3MDYzLCJzdWIiOnsicm9sZWlkIjoyMDMzNiwidGVuYW50aWQiOjEwMTIxfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.Af36SYvSr6U3MO7sIRQKYlK9vf1xrphIsIdt50e7nz7oI2LEFLA42Q9MyiL0tN84YjfMYPNmkm3j7gPgnAlGkLO6ANBj4h9UVSdTYXqElXD3TkRiJ4Gduf_J2wQCpEhewL7oBzBotxT-3BIFszGluwujCSW7afoQUH6YkpjVEIP0KaP6";
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
      .then((response) => response.text())
       .then((result) => {console.log(result);
      res.sendStatus(200)})
      .catch((error) => {console.log("Error getting data from Devii", error)
      res.sendStatus(500)
    });
});


module.exports = router;