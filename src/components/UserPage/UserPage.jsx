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
import "./UserPage.css";
import AddOrganizationModal from "../AddOrganizationModal/AddOrganizationModal.jsx";
import { useHistory } from "react-router-dom";
import {auth_response, allOrgs} from "../Utils/queries"
import {ApolloClient, InMemoryCache, gql, useQuery} from "@apollo/client"
import OrgListView from "../OrgListView/OrgListView.jsx";
import OrganizationCard from "../OrganizationCard/OrganizationCard"


//  const orgList = () => {
//       const {loading, data} = useQuery(fetchAllOrgs())
//         if (loading) return <p>Loading Organizations</p>
  
//       return data.organizations.map((organization) =>{
//         <OrgListView key={organization.id}
//           organization={{
//             ...organization
//           }}
//         />
//       })
//       }

function UserPage() {

  
  // const fetchAllOrgs = () => {
  //   const ACCESS_TOKEN = auth_response.access_token;
  //   const QUERY_URL = "https://api.devii.io/query";
  //   const query = `organization(ordering: "group_collection.organization_id"){\r\n id\r\n organization_name\r\n type\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n primary_contact_phone\r\n primary_contact_email\r\n organization_logo\r\n is_deleted\r\n organization_earnings\r\n organization_notes_collection {\r\n organization_id\r\n note_date\r\n note_content\r\n is_deleted\r\n}\r\n group_collection{\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_description\r\n is_deleted\r\n fundraiser_collection{\r\n id\r\n group_id\r\n title\r\n description\r\n requested_book_quantity\r\n book_quantity_checked_out\r\n book_checked_out_total_value\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n}\r\n}\r\n}`;
  
    
  //   const client = new ApolloClient({
  //     uri: QUERY_URL,
  //     headers: {
  //       Authorization: `Bearer ${ACCESS_TOKEN}`,
  //     },
  //     cache: new InMemoryCache(),
  //   });
    
  //   client
  //     .query({
  //       query: gql`
  //         query organization{
  //           ${query}
  //         }
  //       `,
  //       variables: {},
  //     })
  //     .then((result) => {
  //       console.log(result);
  //       return {
  //         data: result.data.organization
  //       };
  //     })
  //     .catch((error) => {
  //       throw new Error(error);
  //     });
  //   }
  
  useEffect(() => {
    allOrgs();
  }, []);
  // const dispatch = useDispatch();
 
  const history = useHistory();
  // const user = useSelector((store) => store.user);
 

  // const organizationsList = {result}
  
 
  const organizationsList = {data: ""};
  console.log(organizationsList)
  
  
 
  // state for the search and modal and pagination
  const [query, setQuery] = useState(" ");
  const [showInput, setShowInput] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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
      searchResult.slice(indexOfFirstItem, indexOfLastItem)
      ;

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
        <div className="organizationsContainer">
          {/* {organizationsList.data.organization.map((organization, index) => (  */}
           {/* <OrgListView /> */}
          {/* ))} */}
        </div>
        <AddOrganizationModal
          open={isModalOpen}
          handleModalClose={handleModalClose}
        />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* <Pagination
            count={pageCount}
            shape="rounded"
            page={currentPage}
            onChange={handlePageChange}
          /> */}
        </div>

        <br />
      </Paper>
    </div>
  );
}

export default UserPage;
