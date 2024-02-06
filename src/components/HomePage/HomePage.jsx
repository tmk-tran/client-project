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
import "./HomePage.css";
import AddOrganizationModal from "../AddOrganizationModal/AddOrganizationModal.jsx";
import { useHistory } from "react-router-dom";
import ListView from "../ListView/ListView.jsx";
import { allMerchants } from "../../hooks/reduxStore.js";

function HomePage() {
  const dispatch = useDispatch();

  const history = useHistory();
  const user = useSelector((store) => store.user);
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
    // Fetch data when editComplete is true
    if (editComplete) {
      if (!isMerchantList) {
        dispatch({ type: "FETCH_ORGANIZATIONS" });
      } else {
        dispatch({ type: "FETCH_ALL_MERCHANTS" });
      }
      // Reset editComplete state after triggering the refresh
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
        <br />
        <Button
          onClick={() => {
            setIsMerchantList(!isMerchantList);
          }}
        >
          Switch Views
        </Button>
        <br />
        {!isMerchantList ? (
          <center>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Organization List
            </Typography>
            <br />
            <Button
              style={{ marginBottom: "5px" }}
              variant="outlined"
              onClick={handleAddOrganizationClick}
            >
              Add Organization
            </Button>

            {showInput ? (
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
            )}
          </center>
        ) : (
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Merchant List
          </Typography>
        )}

        <div className="organizationsContainer">
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~~~~~~~~~ List Cards ~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* {currentItems.map((organization, index) => (
            <ListView key={index} data={organization} />
          ))} */}

          {isMerchantList
            ? merchants.map((merchant, index) => (
                <ListView
                  key={index}
                  data={merchant}
                  isMerchantList={true}
                  onChange={handleEdit}
                  editComplete={editComplete}
                />
              ))
            : currentItems.map((organization, index) => (
                <ListView
                  key={index}
                  data={organization}
                  isMerchantList={false}
                />
              ))
              // <div>Not Merchant List</div>
          }
        </div>
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        {/* ~~~~~~~~~~~~~~~ Add New Org ~~~~~~~~~~~~~~~~~~~~~~ */}
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <AddOrganizationModal
          open={isModalOpen}
          handleModalClose={handleModalClose}
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
