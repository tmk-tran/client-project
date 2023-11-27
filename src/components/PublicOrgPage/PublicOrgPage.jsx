import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TextField,
  Paper,
  Pagination,
  Typography,
} from "@mui/material";
import Fuse from "fuse.js";
import SearchIcon from "@mui/icons-material/Search";
import "./PublicOrgPage.css";
import AddOrganizationModal from "../AddOrganizationModal/AddOrganizationModal.jsx";
import { useHistory } from "react-router-dom";
import PublicOrgCard from "../PublicOrgCard/PublicOrgCard.jsx";

function PublicOrgPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_ORGANIZATIONS" });
  }, []);

  const user = useSelector((store) => store.user);
  const organizationsList = useSelector((store) => store.organizations);

  const history = useHistory();
  const [query, setQuery] = useState(" ");
  const [showInput, setShowInput] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
// items per page
  const itemsPerPage = 12;

  // search functions and variables
  const fuse = new Fuse(organizationsList, {
    keys: ["organization_name"],
    includeScore: true,
    threshold: 0.3,
    minMatchCharLength: 2,
  });
  const results = fuse.search(query);
  const searchResult = results.map((result) => result.item);

  // on search set current page and show the input
  const handleOnSearch = (value) => {
    setQuery(value);
    if (!showInput) {
      setShowInput(true);
    }
    setCurrentPage(1); // Reset to the first page when searching
  };

  // clear the search query, close showing the input, and set current page to 1
  const clearInput = () => {
    setQuery(" ");
    setShowInput(false);
    setCurrentPage(1); // Reset to the first page when clearing the search
  };


  const handleModalClose = () => {
    setModalOpen(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    searchResult.length > 0
      ? searchResult.slice(indexOfFirstItem, indexOfLastItem)
      : organizationsList.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems =
    searchResult.length > 0 ? searchResult.length : organizationsList.length;
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="organizationsContainer">
      <Paper elevation={3} style={{ width: "90%", margin: "0 auto" }}>
        <br />
        <br />
        <center>
          <Typography
            variant="h5"
            className="organization-header"
            style={{ fontWeight: "bold" }}
          >
            Organization List
          </Typography>
          <br />
          {showInput ? (
            <>
              <br />
              <TextField
                style={{
                  marginTop: "-20px",
                  borderRadius: "4px",
                  width: "230px",
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
                    <SearchIcon
                      color="primary"
                      style={{ marginRight: "10px" }}
                    />
                  ),
                }}
              />
            </>
          ) : (
            <SearchIcon
              color="primary"
              style={{
                cursor: "pointer",
              }}
              onClick={() => setShowInput(true)}
            />
          )}
          {showInput && (
            <Button
              style={{
                marginTop: "-17px",
                marginLeft: "10px",
                backgroundColor: "#DAA226",
                height: "30px",
                color: "white",
                width: "0px",
                fontSize: "13px",
              }}
              variant="contained"
              onClick={clearInput}
            >
              Clear
            </Button>
          )}
        </center>
        <div className="organizationsContainer">
          {currentItems.map((organization, index) => (
            <PublicOrgCard key={index} organization={organization} />
          ))}
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
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

export default PublicOrgPage;
