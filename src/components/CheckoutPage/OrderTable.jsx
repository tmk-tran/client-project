import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";
import { border } from "../Utils/colors";

export default function OrderTable({
  rows,
  selectedRows,
  handleRowSelect,
  handleQuantityChange,
  handlePayment,
  customDonation,
  setCustomDonation,
  clearDonation,
}) {
  console.log(rows);

//   const [customDonation, setCustomDonation] = useState(0);
//   console.log(customDonation);

  const quantityChange = (e, row) => {
    const newQuantity = parseInt(e.target.value, 10);
    const updatedRows = rows.map((r) => {
      if (r.id === row.id) {
        return { ...r, quantity: newQuantity };
      }
      return r;
    });

    if (row.bookType === "Donate") {
      const updatedRow = { ...row, quantity: newQuantity };
      const donationIndex = updatedRows.findIndex((r) => r.id === row.id);
      updatedRows.splice(donationIndex, 1, updatedRow);
    }
    console.log(updatedRows);

    handleQuantityChange(updatedRows);

    const totalAmount = updatedRows.reduce(
      (acc, r) => acc + r.price * r.quantity,
      0
    );
    console.log(totalAmount);

    const withDonation = customDonation + totalAmount;
    console.log(withDonation);
  };

  const subtotal =
    rows.reduce((acc, row) => acc + row.price * row.quantity, 0) +
    customDonation;
  console.log(subtotal);
  handlePayment(subtotal);

  return (
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
            <TableCell>
              {row.bookType === "Donate" ? (
                <Typography>-</Typography>
              ) : (
                `$ ${row.price}`
              )}
            </TableCell>

            <TableCell>
              {row.bookType === "Donate" ? (
                <TextField
                  label="Custom Donation"
                  type="number"
                  value={customDonation}
                  onChange={(e) =>
                    setCustomDonation(parseInt(e.target.value, 10))
                  }
                  InputProps={{ inputProps: { min: 0 } }}
                />
              ) : (
                <TextField
                  type="number"
                  value={row.quantity}
                  onChange={(e) => quantityChange(e, row)}
                  InputProps={{ inputProps: { min: 1 } }}
                />
              )}
            </TableCell>
            <TableCell>
              {row.bookType !== "Donate" ? (
                <>$ {row.price * row.quantity}</>
              ) : (
                <>$ {customDonation}</>
              )}
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan={3} sx={{ border: "none" }} />
          <TableCell align="right" sx={{ border: "none" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Subtotal:
            </Typography>
          </TableCell>
          <TableCell align="left" sx={{ border: "none" }}>
            <Typography variant="h6">${subtotal}</Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
