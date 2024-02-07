import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Search, Clear } from "@mui/icons-material";

const SearchBar = ({ isOrganization }) => {
  console.log(isOrganization);
  const [searchValue, setSearchValue] = useState("");

  const handleClearSearch = () => {
    setSearchValue(""); // Clear the search value
  };

  return (
    <>
      {isOrganization ? (
        <TextField
          label="Search Organizations"
          variant="outlined"
          size="small"
          // value={query}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <Search
                color="action"
                fontSize="small"
                style={{ marginRight: 16 }}
              />
            ),
            endAdornment: searchValue && (
              <Clear
                color="action"
                fontSize="small"
                onClick={handleClearSearch}
                style={{ cursor: "pointer" }}
              />
            ),
          }}
        />
      ) : (
        <TextField
          label="Search Merchants"
          variant="outlined"
          size="small"
          // value={query}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <Search
                color="action"
                fontSize="small"
                style={{ marginRight: 16 }}
              />
            ),
            endAdornment: searchValue && (
              <Clear
                color="action"
                fontSize="small"
                onClick={handleClearSearch}
                style={{ cursor: "pointer" }}
              />
            ),
          }}
        />
      )}
    </>
  );
};

export default SearchBar;
