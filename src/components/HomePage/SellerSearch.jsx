import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { dispatchHook } from "../../hooks/useDispatch";
import { highlightColor } from "../Utils/colors";
import { historyHook } from "../../hooks/useHistory";
import { capitalizeFirstWord } from "../Utils/helpers";

const TopDrawer = ({ sellers }) => {
  console.log(sellers);
  const dispatch = dispatchHook();
  const history = historyHook();
  const [open, setOpen] = useState(false);
  const [lastName, setLastName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  const navigateToOrg = (sellerId) => {
    history.push(`/fargo/orgDetails/${sellerId}`);
    resetSearchField();
  };

  return (
    <div>
      <Button sx={{ m: 2 }} onClick={() => setOpen(true)}>
        <PersonSearchIcon sx={{ mr: 1, fontSize: 30 }} />
        Sellers
      </Button>
      <Drawer anchor="top" open={open} onClose={handleClose}>
        <div style={{ padding: "16px", width: "60%", margin: "0 auto" }}>
          <TextField
            label="Search Sellers by Last Name"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={handleSearchChange}
          />
          <List>
            {searchResults.map((seller) => (
              <ListItem key={seller.id}>
                <ListItemText
                  primary={`${seller.firstname} ${seller.lastname}`}
                  //   secondary={`Ref ID: ${seller.refId} | Organization: ${seller.organization_name}`}
                  secondary={
                    <span>
                      <span
                        style={{ ...highlightColor }}
                      >{`Ref ID: ${seller.refId}`}</span>{" "}
                      | Organization:{" "}
                      <Link
                        component="button"
                        variant="body1"
                        underline="none"
                        onClick={() => navigateToOrg(seller.organization_id)}
                        sx={{ mb: 0.5 }}
                      >
                        {seller.organization_name}
                      </Link>
                    </span>
                  }
                />
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleFetchSeller}>
              Search
            </Button>
          </Box>
        </div>
      </Drawer>
    </div>
  );
};

export default TopDrawer;
