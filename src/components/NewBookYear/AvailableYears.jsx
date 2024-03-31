// import React, { useEffect } from "react";
// import { Grid, Typography } from "@mui/material";
// import { allYears } from "../../hooks/reduxStore";
// import { dispatchHook } from "../../hooks/useDispatch";
// import { border } from "../Utils/colors";

// export default function AvailableYears() {
//   const dispatch = dispatchHook();
//   useEffect(() => {
//     const dispatchAction = {
//       type: "FETCH_COUPON_BOOKS",
//     };
//     console.log(dispatchAction);
//     dispatch(dispatchAction);
//   }, []);
//   const years = allYears();

//   return (
//     <Grid container direction="column" alignItems="center" sx={border}>
//       <Grid item xs={12} sx={{ border: "1px solid blue" }}>
//         <Typography sx={{ textAlign: "center" }}>
//           Available years:
//         </Typography>
//       </Grid>
//       {years.map((yearObj) => (
//         <Grid item xs={12} key={yearObj.id}>
//           <Typography sx={{ textAlign: "center" }}>
//             {yearObj.year}
//           </Typography>
//         </Grid>
//       ))}
//     </Grid>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Typography,
} from "@mui/material";
import { allYears } from "../../hooks/reduxStore";
import { dispatchHook } from "../../hooks/useDispatch";
import { border } from "../Utils/colors";
import { centeredStyle } from "../Utils/pageStyles";

export default function AvailableYears() {
  const dispatch = dispatchHook();
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const dispatchAction = {
      type: "FETCH_COUPON_BOOKS",
    };
    console.log(dispatchAction);
    dispatch(dispatchAction);
  }, []);
  const years = allYears();

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const displayedYears = years.slice(startIdx, endIdx);

  return (
    <>
      <Typography sx={{ textAlign: "center" }}>Available years:</Typography>
      <Box sx={centeredStyle}>
        <List>
          {displayedYears.map((year) => (
            <ListItem key={year.id}>
              <ListItemText primary={year.year} />
            </ListItem>
          ))}
        </List>
        <Pagination
          count={Math.ceil(years.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
}
