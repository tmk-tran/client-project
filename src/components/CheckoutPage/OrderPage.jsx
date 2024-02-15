import React, { useState } from "react";
import { Button } from "@mui/material";
import { border } from "../Utils/colors";
import OrderTable from "./OrderTable";
import { historyHook } from "../../hooks/useHistory";

export default function OrderPage() {
  const history = historyHook();
  const [selectedRows, setSelectedRows] = useState([]);
  console.log(selectedRows);

  const handleRowSelect = (rowId) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const rows = [
    { id: 1, bookType: "Book A", price: 10, quantity: 1 },
    { id: 2, bookType: "Book B", price: 15, quantity: 1 },
    { id: 3, bookType: "Book C", price: 20, quantity: 1 },
    { id: 4, bookType: "Book D", price: 25, quantity: 1 },
  ];

  return (
    <div style={{ minHeight: "80vh", width: "70%", margin: "0 auto" }}>
      <OrderTable
        rows={rows}
        selectedRows={selectedRows}
        handleRowSelect={handleRowSelect}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {/* <Button variant="contained" sx={{ mr: 20 }}>Pay Now</Button> */}
        <Button variant="contained" onClick={() => history.push("/checkout")}>Pay Now</Button>
      </div>
    </div>
  );
}
