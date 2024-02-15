import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  TextField,
} from "@mui/material";

export default function OrderPage() {
  const [selectedRows, setSelectedRows] = React.useState([]);

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
    <div style={{ minHeight: "80vh" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>Book Type</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleRowSelect(row.id)}
                />
              </TableCell>
              <TableCell>{row.bookType}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  defaultValue={row.quantity}
                  InputProps={{ inputProps: { min: 1 } }}
                />
              </TableCell>
              <TableCell>{row.price * row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
