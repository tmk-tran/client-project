import React from "react";
import TextField from "@mui/material/TextField";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      size="small"
      InputProps={{
        startAdornment: (
          <Search color="action" fontSize="small" style={{ marginRight: 8 }} />
        ),
      }}
      style={{ marginTop: 5 }}
    />
  );
};

export default SearchBar;
