import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Typography,
} from "@mui/material";
import TotalUpdate from "./TotalUpdate";
import { border } from "../Utils/colors";

export default function OrderSummaryTable({
  selectedProducts,
  customDonation,
  setCustomDonation,
  onUpdateQuantity,
  caseType,
}) {
  console.log(selectedProducts);
  console.log(caseType);
  const [localQuantities, setLocalQuantities] = useState(
    selectedProducts.reduce((quantities, product) => {
      quantities[product.id] = product.quantity;
      return quantities;
    }, {})
  );
  console.log(localQuantities);
  console.log(customDonation);
  const [orderTotal, setOrderTotal] = useState(0);
  console.log(orderTotal);

  // const handleQuantityChange = (productId, newQuantity) => {
  //   const updatedQuantities = { ...localQuantities, [productId]: newQuantity };
  //   setLocalQuantities(updatedQuantities);
  //   onUpdateQuantity(updatedQuantities);
  // };

  const handleQuantityChange = (productId, newQuantity) => {
    console.log(productId, newQuantity);
    if (productId === 4) {
      setCustomDonation(newQuantity);
    } else {
      const updatedQuantities = {
        ...localQuantities,
        [productId]: newQuantity,
      };
      setLocalQuantities(updatedQuantities);
      onUpdateQuantity(updatedQuantities);
    }
  };

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Book Type</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedProducts.length > 0 ? (
            selectedProducts.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.bookType}</TableCell>
                {/* <TableCell>${product.price}</TableCell> */}
                <TableCell>
                  {product.bookType === "Donate" ? (
                    <Typography>-</Typography>
                  ) : (
                    `$ ${product.price}`
                  )}
                </TableCell>
                {/* <TableCell align="right" sx={{ width: "10%" }}>
                  {product.bookType === "Donate" ? (
                    <TextField
                      type="number"
                      value={customDonation}
                      onChange={(e) =>
                        handleQuantityChange(product.id, e.target.value)
                      }
                      InputProps={{ inputProps: { min: 1 } }}
                    />
                  ) : (
                    <TextField
                      type="number"
                      value={localQuantities[product.id]}
                      onChange={(e) =>
                        handleQuantityChange(product.id, e.target.value)
                      }
                      InputProps={{ inputProps: { min: 1 } }}
                    />
                  )}
                </TableCell> */}

                <TableCell align="right" sx={{ width: "10%" }}>
                  {caseType === "Summary" && product.bookType === "Donate" ? (
                    customDonation
                  ) : caseType === "Summary" ? (
                    localQuantities[product.id]
                  ) : (
                    <TextField
                      type="number"
                      value={
                        product.bookType === "Donate"
                          ? customDonation
                          : localQuantities[product.id]
                      }
                      onChange={(e) =>
                        handleQuantityChange(product.id, e.target.value)
                      }
                      InputProps={{ inputProps: { min: 1 } }}
                    />
                  )}
                </TableCell>

                <TableCell align="right">
                  {product.bookType !== "Donate" ? (
                    <>$ {product.price * localQuantities[product.id]}</>
                  ) : (
                    <>$ {customDonation}</>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                <Typography variant="h6" gutterBottom>
                  No products selected.
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {/* <TableRow>
            <TableCell colSpan={3}></TableCell>
            <TableCell sx={{ border: "none" }}>
              <TotalUpdate
                selectedProducts={selectedProducts}
                onChange={(total) => {
                  setOrderTotal(total);
                }}
              />
            </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </Paper>
  );
}
