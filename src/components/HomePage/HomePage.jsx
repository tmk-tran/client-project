import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TextField,
  Paper,
  Pagination,
  Typography,
  Fab,
} from "@mui/material";
import "./HomePage.css";
import Fuse from "fuse.js";
import SearchIcon from "@mui/icons-material/Search";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import AddIcon from '@mui/icons-material/Add';
// ~~~~~~~~~~ Components ~~~~~~~~~~~~~~
import AddAccountModal from "../AddAccountModal/AddAccountModal.jsx";
import ListView from "../ListView/ListView.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { allMerchants } from "../../hooks/reduxStore.js";

function HomePage() {
  const dispatch = useDispatch();
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~ Store ~~~~~~~~~~~~~~~~~~~~
  const organizationsList = useSelector((store) => store.organizations);
  console.log(organizationsList);
  const merchants = allMerchants() || [];
  console.log(merchants);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [isMerchantList, setIsMerchantList] = useState(false);
  console.log(isMerchantList);

  // state for the search and modal and pagination
  const [query, setQuery] = useState(" ");
  const [showInput, setShowInput] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editComplete, setEditComplete] = useState(false);
  console.log(editComplete);
  const itemsPerPage = 12;

  useEffect(() => {
    // Initial data fetch based on isMerchantList
    const fetchDataAction = isMerchantList
      ? "FETCH_MERCHANTS"
      : "FETCH_ORGANIZATIONS";
    dispatch({ type: fetchDataAction });

    // If editComplete is true, trigger refresh and reset editComplete
    if (editComplete) {
      dispatch({ type: fetchDataAction });
      setEditComplete(false);
    }
  }, [isMerchantList, editComplete]);

  // fuzzy search information
  const fuse = new Fuse(organizationsList, {
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

  // clears out the input field
  const clearInput = () => {
    setQuery(" ");
    setShowInput(false);
    setCurrentPage(1); // Reset to the first page when clearing the search
  };

  // opens the add org modal
  const handleAddOrganizationClick = () => {
    setModalOpen(true);
  };
  // closes the modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // index of org for pagination
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

  const handleEdit = () => {
    setEditComplete(true);
  };

  return (
    <div className="organizationsContainer">
      <Paper elevation={3} style={{ width: "90%", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~ TOGGLE VIEWS ~~~~~~~~~~ */}
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          <Button
            variant="outlined"
            onClick={() => {
              setIsMerchantList(!isMerchantList);
            }}
            sx={{ margin: 2 }}
          >
            {!isMerchantList ? (
              <>
                <ToggleOnIcon />
                &nbsp;Merchants
              </>
            ) : (
              <>
                <ToggleOffIcon />
                &nbsp;Organizations
              </>
            )}
          </Button>

          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~ SEARCH BAR ~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          <div style={{ margin: 16 }}>
            {!isMerchantList ? (
              <SearchBar isOrganization={true} />
            ) : (
              <SearchBar isOrganization={false} />
            )}
          </div>
        </div>
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        {/* ~~~~~~~~~~ PAGE HEADER ~~~~~~~~~~~ */}
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {!isMerchantList ? "Organization List" : "Merchant List"}
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <Button
            style={{ marginBottom: "5px" }}
            variant="outlined"
            onClick={handleAddOrganizationClick}
          >
            {!isMerchantList ? "Add Organization" : "Add Merchant"}
          </Button>
        </div>

        {/* {showInput ? (
              <>
                <br />
                <TextField
                  style={{
                    marginTop: "10px",
                    marginLeft: "3%",
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
                  marginLeft: "3%",
                  marginBottom: "-7px",
                  cursor: "pointer",
                }}
                onClick={() => setShowInput(true)}
              />
            )}
            {showInput && (
              <Button
                style={{
                  marginTop: "15px",
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
            )} */}

        <div className="organizationsContainer">
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~~~~~~~~~ List Cards ~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

          {
            isMerchantList
              ? merchants.map((merchant, index) => (
                  <ListView
                    key={index}
                    data={merchant}
                    isMerchantList={true}
                    onChange={handleEdit}
                    editComplete={editComplete}
                    setEditComplete={setEditComplete}
                  />
                ))
              : currentItems.map((organization, index) => (
                  <ListView
                    key={index}
                    data={organization}
                    isMerchantList={false}
                    onChange={handleEdit}
                    editComplete={editComplete}
                    setEditComplete={setEditComplete}
                  />
                ))
            // <div>Not Merchant List</div>
          }
        </div>
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        {/* ~~~~~~~~~~~~~~~ Add New Org ~~~~~~~~~~~~~~~~~~~~~~ */}
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <AddAccountModal
          open={isModalOpen}
          handleModalClose={handleModalClose}
          isMerchantList={isMerchantList}
        />
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

export default HomePage;
