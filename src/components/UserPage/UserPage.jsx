import React, { useEffect, useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  TextField,
} from "@mui/material";
import OrganizationCard from "../OrganizationCard/OrganizationCard";
import Fuse from "fuse.js";
import SearchIcon from "@mui/icons-material/Search";
import "./UserPage.css";

function UserPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_ORGANIZATIONS" });
  }, []);

  const user = useSelector((store) => store.user);
  const organizationsList = useSelector((store) => store.organizations);

  const [query, setQuery] = useState(" ");
  const fuse = new Fuse(organizationsList, {
    keys: ["organization_name"],
    includeScore: true,
    threshold: 0.3, // Adjust this threshold (0.0 to 1.0) for strictness
    minMatchCharLength: 2, // Adjust the minimum character length for a match
  });
  const results = fuse.search(query);
  const searchResult = results.map((result) => result.item);

  function handleOnSearch(value) {
    console.log(value); // Add this line for debugging
    setQuery(value);
  }

  function clearInput() {
    setQuery(" ");
  }

  return (
    <div className="container">
      <div
        style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
      >
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
      </div>
      <div>
        <TextField
          style={{
            marginLeft: "3%",
            borderRadius: "4px",
            width: "250px",
            marginBottom: "20px",
            backgroundColor: "white",
          }}
          variant="outlined"
          fullWidth
          size="small"
          label="Search By Organization"
          value={query}
          onChange={(e) => handleOnSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon color="primary" style={{ marginRight: "10px" }} />
            ),
          }}
        />
        <Button
          style={{
            marginTop: "5px",
            marginLeft: "10px",
            backgroundColor: "#DAA226",
            height: "30px",
            color: "white",
            width: "80px",
            fontSize: "13px",
          }}
          variant="contained"
          onClick={() => {
            clearInput();
          }}
        >
          Clear
        </Button>
      </div>
      <div className="organizationsContainer">
        {searchResult.length > 0
          ? searchResult.map((organization, index) => (
              <OrganizationCard key={index} organization={organization} />
            ))
          : organizationsList.map((organization, index) => (
              <OrganizationCard key={index} organization={organization} />
            ))}
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
