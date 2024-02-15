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
    console.log(rowId);
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const clearTotal = () => {
    const updatedRows = rows.map((row) => ({ ...row, quantity: 0 }));
    setRows(updatedRows);
  };

  const [rows, setRows] = useState([
    { id: 1, bookType: "Book A", price: 10, quantity: 0 },
    { id: 2, bookType: "Book B", price: 15, quantity: 0 },
    { id: 3, bookType: "Book C", price: 20, quantity: 0 },
    { id: 4, bookType: "Book D", price: 25, quantity: 0 },
  ]);

  const handleQuantityChange = (newRows) => {
    setRows(newRows);
  };

  return (
    <div style={{ minHeight: "80vh", width: "70%", margin: "0 auto" }}>
      <OrderTable
        rows={rows}
        selectedRows={selectedRows}
        handleRowSelect={handleRowSelect}
        handleQuantityChange={handleQuantityChange}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {/* <Button variant="contained" sx={{ mr: 20 }}>Pay Now</Button> */}
        <Button onClick={clearTotal}>Clear</Button>
        <Button variant="contained" onClick={() => history.push("/checkout")}>
          Pay Now
        </Button>
      </div>
    </div>
  );
}
