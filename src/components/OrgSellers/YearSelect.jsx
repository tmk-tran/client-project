import React, { useState, useEffect } from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { dispatchHook } from "../../hooks/useDispatch";
import { allYears } from "../../hooks/reduxStore";

export default function YearSelect() {
  const dispatch = dispatchHook();
  const [yearSelected, setYearSelected] = useState("");

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
  };

  return (
    <Box sx={{ minWidth: 120, p: 1 }}>
      <FormControl fullWidth>
        <InputLabel>Year</InputLabel>
        <Select value={yearSelected} label="Year" onChange={handleChange}>
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
