import React, { useState, useEffect } from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { dispatchHook } from "../../hooks/useDispatch";
import { allYears } from "../../hooks/reduxStore";

export default function YearSelect({ setViewYearId }) {
  const dispatch = dispatchHook();
  const [yearSelected, setYearSelected] = useState("");
  console.log(yearSelected);

  useEffect(() => {
    const dispatchAction = {
      type: "FETCH_COUPON_BOOKS",
    };
    console.log(dispatchAction);
    dispatch(dispatchAction);
  }, []);

  const years = allYears();
  console.log(years);

  const handleChange = (event) => {
    setYearSelected(event.target.value);
    setViewYearId(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 150, p: 1 }}>
      <FormControl fullWidth>
        <InputLabel>Book Year</InputLabel>
        <Select value={yearSelected} label="Book Year" onChange={handleChange}>
          {years.map((year) => (
            <MenuItem key={year.id} value={year.id}>
              {year.year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
