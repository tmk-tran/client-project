import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Link,
  Tooltip,
} from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { dispatchHook } from "../../hooks/useDispatch";
import { highlightColor } from "../Utils/colors";
import { historyHook } from "../../hooks/useHistory";
import { capitalizeFirstWord } from "../Utils/helpers";
// ~~~~~~~~~~ Components ~~~~~~~~~~ //
import SearchButtons from "./SearchButtons";
import LinearProgressBar from "../LinearProgressBar/LinearProgressBar";

const refIdStyle = {
  ...highlightColor,
  padding: 3,
  borderRadius: 4,
};

const TopDrawer = ({ sellers }) => {
  console.log(sellers);
  const dispatch = dispatchHook();
  const history = historyHook();
  const [open, setOpen] = useState(false);
  const [lastName, setLastName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Update searchResults when sellers prop changes
    setSearchResults(sellers ? sellers : []);
  }, [sellers]);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setLastName(capitalizeFirstWord(searchTerm));
  };

  const handleFetchSeller = () => {
    // Dispatch a fetch action to retrieve sellers matching the search term
    const fetchSellersByName = {
      type: "FETCH_SELLER_BY_NAME",
      payload: {
        lastname: lastName,
      },
    };
    console.log(fetchSellersByName);
    dispatch(fetchSellersByName);
  };

  const resetSearchedSellers = () => ({
    type: "RESET_SEARCHED_SELLERS",
  });

  const resetSearchField = () => {
    setLastName("");
    setSearchResults([]);
    // Clear the reducer
    dispatch(resetSearchedSellers());
  };

  const handleClose = () => {
    setOpen(false);
    resetSearchField();
  };

  //   const navigateToOrg = (sellerId) => {
  //     setLoading(true); // Set loading to true when navigating
  //     history.push(`/fargo/orgDetails/${sellerId}`);
  //     resetSearchField();
  //   };
  const navigateToOrg = (sellerId) => {
    setLoading(true); // Set loading to true first
    setTimeout(() => {
      history.push(`/fargo/orgDetails/${sellerId}`); // Navigate to the new URL
      setLoading(false); // Set loading to false after navigation
    }, 0); // Use setTimeout to ensure the setLoading(false) runs after the state is updated
    resetSearchField();
  };

  console.log(loading);

  return (
    <div>
      <Button sx={{ m: 2 }} onClick={() => setOpen(true)}>
        <PersonSearchIcon sx={{ mr: 1, fontSize: 30 }} />
        Sellers
      </Button>
      <Drawer anchor="top" open={open} onClose={handleClose}>
        <div style={{ padding: "16px", width: "50%", margin: "0 auto" }}>
          <TextField
            label="Search Sellers by Last Name"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={handleSearchChange}
            sx={{ mb: 1 }}
          />
          {/* ~~~~~ Action Buttons ~~~~~ */}
          {!loading && (
            <SearchButtons
              handleClose={handleClose}
              handleFetchSeller={handleFetchSeller}
            />
          )}
          <List>
            {searchResults.map((seller) => (
              <ListItem key={seller.id}>
                <ListItemText
                  primary={`${seller.firstname} ${seller.lastname}`}
                  //   secondary={`Ref ID: ${seller.refId} | Organization: ${seller.organization_name}`}
                  secondary={
                    <span>
                      <span style={refIdStyle}>
                        Ref ID:{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {seller.refId}
                        </span>
                      </span>{" "}
                      | Organization:{" "}
                      <Tooltip title="Go to Organization">
                        <Link
                          component="button"
                          variant="body1"
                          underline="none"
                          onClick={() => navigateToOrg(seller.organization_id)}
                          sx={{ mb: 0.5 }}
                        >
                          {seller.organization_name}
                        </Link>
                      </Tooltip>
                    </span>
                  }
                />
              </ListItem>
            ))}
          </List>
          {/* ~~~~~ Loading Message ~~~~~ */}
          {loading && (
            <>
              <LinearProgressBar />
              <p>Loading Organization Details...</p>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default TopDrawer;
