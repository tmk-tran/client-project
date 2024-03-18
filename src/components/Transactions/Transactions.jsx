import React, { useEffect } from "react";
import { Box, Tab, Typography } from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~ //
import { dispatchHook } from "../../hooks/useDispatch";
import { centeredStyle, containerStyle } from "../Utils/pageStyles";
import { paypalTransactions } from "../../hooks/reduxStore";
// ~~~~~~~~~~ Components ~~~~~~~~~ //
import TransactionsTable from "./TransactionsTable";

export default function Transactions() {
  const dispatch = dispatchHook();

  useEffect(() => {
    dispatch({ type: "FETCH_PAYPAL_TRANSACTIONS" });
  }, []);

  const transactionList = paypalTransactions() || [];
  console.log(transactionList);

  return (
    // <Box sx={{ ...centeredStyle, ...containerStyle }}>
    <Box>
      <Typography variant="h6">Transactions</Typography>
      <Box sx={{ width: "100%" }}>
      <TransactionsTable transactions={transactionList} />
      </Box>
    </Box>
  );
}
