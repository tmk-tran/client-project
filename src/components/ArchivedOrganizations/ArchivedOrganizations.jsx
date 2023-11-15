import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Paper, Pagination, Typography } from "@mui/material";
import Fuse from "fuse.js";
import SearchIcon from "@mui/icons-material/Search";
import ArchivedOrganizationCard from "../ArchivedOrganizationCard/ArchivedOrganizationCard";
import "./ArchivedOrganizations.css";
import { useHistory } from "react-router-dom";

export default function ArchivedOrganizations() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_ARCHIVED_ORGANIZATIONS" });
  }, []);
  const itemsPerPage = 4;
const history = useHistory();
  const [query, setQuery] = useState(" ");
  const [showInput, setShowInput] = useState(false);
  const user = useSelector((store) => store.user);
  const archivedList = useSelector((store) => store.archivedOrganizations);
  console.log("ARCHIVED", archivedList);

  const [currentPage, setCurrentPage] = useState(1);

  const fuse = new Fuse(archivedList, {
    keys: ["organization_name"],
    includeScore: true,
    threshold: 0.3,
    minMatchCharLength: 2,
  });
  const results = fuse.search(query);
  const searchResult = results.map((result) => result.item);

  const handleOnSearch = (value) => {
    setQuery(value);
    if (!showInput) {
      setShowInput(true);
    }
    setCurrentPage(1); // Reset to the first page when searching
  };

  const clearInput = () => {
    setQuery(" ");
    setShowInput(false);
    setCurrentPage(1); // Reset to the first page when clearing the search
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    searchResult.length > 0
      ? searchResult.slice(indexOfFirstItem, indexOfLastItem)
      : archivedList.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems =
    searchResult.length > 0 ? searchResult.length : archivedList.length;
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

function backToHome(){
  history.push("/user");
}

  return (
    <div className="organizationsContainer">
      <Paper elevation={3} style={{ width: "90%", margin: "0 auto" }}>
        <br />
        <center>
        <br />
          <Typography
            variant="h5"
            className="organization-header"
            style={{ fontWeight: "bold" }}
          >
            Archived Organizations
          </Typography>
          <Button onClick={backToHome}> </Button>
        </center>
        <div className="fuzzy-search-archived">
      {showInput ? (
        <TextField
          style={{
            marginLeft: '3%',
            borderRadius: '4px',
            width: '230px',
            backgroundColor: 'white',
          }}
          variant="outlined"
          fullWidth
          size="small"
          label="Search By Organization"
          value={query}
          onChange={(e) => handleOnSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon color="primary" style={{ marginRight: '10px' }} />
            ),
          }}
        />
      ) : (
        <SearchIcon
          color="primary"
          style={{
            marginTop: "-15px",
            cursor: 'pointer',
          }}
          onClick={() => setShowInput(true)}
        />
      )}
      {showInput && (
        <Button
          style={{
            marginTop: '5px',
            marginLeft: '10px',
            backgroundColor: '#DAA226',
            height: '30px',
            color: 'white',
            width: '0px',
            fontSize: '13px',
          }}
          variant="contained"
          onClick={clearInput}
        >
          Clear
        </Button>
      )}
    </div>
        <div className="organizationsContainer">
          {currentItems.map((organization, index) => (
            <ArchivedOrganizationCard key={index} organization={organization} />
          ))}
        </div>
<br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={pageCount}
            shape="rounded"
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
        <br />
      </Paper>
    </div>
  );
}
