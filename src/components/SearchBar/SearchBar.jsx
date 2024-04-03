// import React, { useState } from "react";
// import TextField from "@mui/material/TextField";
// import { Search, Clear } from "@mui/icons-material";

// const SearchBar = ({ isOrganization, isCoupon, query, onChange, clearInput }) => {
//   console.log(isOrganization);
//   console.log(isCoupon);

//   const handleChange = (event) => {
//     const { value } = event.target;
//     console.log(value);
//     onChange(value); // Call the onChange function passed from the parent
//   };

//   const handleClearSearch = () => {
//     clearInput();
//   };

//   return (
//     <>
//       {isOrganization && !isCoupon ? (
//         <TextField
//           label="Search Organizations"
//           variant="outlined"
//           size="small"
//           value={query}
//           onChange={handleChange}
//           InputProps={{
//             startAdornment: (
//               <Search
//                 color="primary"
//                 fontSize="small"
//                 style={{ marginRight: 16 }}
//               />
//             ),
//             endAdornment: query && (
//               <Clear
//                 color="action"
//                 fontSize="small"
//                 onClick={handleClearSearch}
//                 style={{ cursor: "pointer" }}
//               />
//             ),
//           }}
//         />
//       ) : (
//         <TextField
//           label={isCoupon ? "Search by Merchant" : "Search Merchants"}
//           variant="outlined"
//           size="small"
//           value={query}
//           onChange={handleChange}
//           InputProps={{
//             startAdornment: (
//               <Search
//                 color="primary"
//                 fontSize="small"
//                 style={{ marginRight: 16 }}
//               />
//             ),
//             endAdornment: query && (
//               <Clear
//                 color="action"
//                 fontSize="small"
//                 onClick={handleClearSearch}
//                 style={{ cursor: "pointer" }}
//               />
//             ),
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default SearchBar;

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Search, Clear } from "@mui/icons-material";

const SearchBar = ({
  isMobile,
  isOrganization,
  isCoupon,
  query,
  onChange,
  clearInput,
}) => {
  const [isSticky, setIsSticky] = useState(false);

  const stickyStyle = {
    position: isSticky ? "fixed" : "static",
    top: 0,
    width: "100%",
    zIndex: 999,
    backgroundColor: "white",
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    onChange(value);
  };

  const handleClearSearch = () => {
    clearInput();
  };

  return (
    <div style={isMobile ? stickyStyle : {}}>
      {isOrganization && !isCoupon ? (
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
          label={isCoupon ? "Search by Merchant" : "Search Merchants"}
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
    </div>
  );
};

export default SearchBar;
