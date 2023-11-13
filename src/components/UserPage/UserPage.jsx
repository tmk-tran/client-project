import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TextField,
  Paper
} from "@mui/material";
import OrganizationCard from "../OrganizationCard/OrganizationCard";
import Fuse from "fuse.js";
import SearchIcon from "@mui/icons-material/Search";
import "./UserPage.css";
import AddOrganizationModal from "../AddOrganizationModal/AddOrganizationModal.jsx";

function UserPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_ORGANIZATIONS" });
  }, []);

  const user = useSelector((store) => store.user);
  const organizationsList = useSelector((store) => store.organizations);

  const [query, setQuery] = useState(" ");
  const [isModalOpen, setModalOpen] = useState(false);

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

  const handleAddOrganizationClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="container">
      <Paper elevation={6} style={{ width: "90%", margin: "0 auto"  }}>
        <br />
      <center><h1 className="organization-header">Organization List</h1>
     <Button onClick={handleAddOrganizationClick}>Add Organization</Button></center>
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
      <AddOrganizationModal open={isModalOpen} handleModalClose={handleModalClose} />
      <br />
      </Paper>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
