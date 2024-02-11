import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Search, Clear } from "@mui/icons-material";

const SearchBar = ({ isOrganization, query, onChange, clearInput }) => {
  
  const handleChange = (event) => {
    const { value } = event.target;
    onChange(value); // Call the onChange function passed from the parent
  };

  const handleClearSearch = () => {
    clearInput();
  };

  return (
    <>
      {isOrganization ? (
        <TextField
          label="Search Organizations"
          variant="outlined"
          size="small"
          value={query}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <Search
                color="primary"
                fontSize="small"
                style={{ marginRight: 16 }}
              />
            ),
            endAdornment: query && (
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
          value={query}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <Search
                color="primary"
                fontSize="small"
                style={{ marginRight: 16 }}
              />
            ),
            endAdornment: query && (
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
