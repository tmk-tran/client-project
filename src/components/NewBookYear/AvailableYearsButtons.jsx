import React, { useState, useEffect } from "react";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Pagination,
} from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~ //
import { dispatchHook } from "../../hooks/useDispatch";
import { allYears } from "../../hooks/reduxStore";
import { centeredStyle } from "../Utils/pageStyles";

const AvailableYearsButtons = ({ onSelect }) => {
  const dispatch = dispatchHook();
  const [selectedYear, setSelectedYear] = useState([]);

  useEffect(() => {
    const dispatchAction = {
      type: "FETCH_COUPON_BOOKS",
    };
    console.log(dispatchAction);
    dispatch(dispatchAction);
  }, []);
  const years = allYears();

  const handleChange = (event, year) => {
    setSelectedYear(year);
    // onSelect(year);
    console.log("clicked");
  };

  const itemsPerPage = 5;
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const displayedYears = years.slice(startIdx, endIdx);

  return (
    <>
      <Typography sx={{ textAlign: "center" }}>Available Years: </Typography>
      <Box sx={centeredStyle}>
        <ToggleButtonGroup
          value={selectedYear}
          exclusive
          onChange={handleChange}
          orientation="vertical"
        >
          {displayedYears.map((year) => (
            <ToggleButton key={year.id} value={year.year}>
              {year.year}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <br />
        <Pagination
          count={Math.ceil(years.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </>
  );
};

export default AvailableYearsButtons;
