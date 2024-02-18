// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TextField,
//   Paper,
//   Typography,
// } from "@mui/material";

// export default function OrderSummaryTable({ selectedProducts }) {
//   const [newQuantity, setNewQuantity] = useState(0);

//   return (
//     <Paper>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Book Type</TableCell>
//             <TableCell>Price</TableCell>
//             <TableCell>Quantity</TableCell>
//             <TableCell>Total</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {selectedProducts ? (
//             selectedProducts.map((product, index) => (
//               <TableRow key={index}>
//                 <TableCell>{product.bookType}</TableCell>
//                 <TableCell>${product.price}</TableCell>
//                 {/* <TableCell>{product.quantity}</TableCell> */}
//                 <TableCell>
//                   <TextField
//                     type="number"
//                     value={newQuantity}
//                     onChange={(e) => setNewQuantity(e.target.value)}
//                     InputProps={{ inputProps: { min: 1 } }}
//                     sx={{ width: "20%" }}
//                   />
//                 </TableCell>
//                 <TableCell>${product.price * product.quantity}</TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={4}>
//                 <Typography variant="h6" gutterBottom>
//                   No products selected.
//                 </Typography>
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </Paper>
//   );
// }

// OrderSummaryTable.js
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

export default function OrderSummaryTable({
  selectedProducts,
  onUpdateQuantity,
}) {
  const [localQuantities, setLocalQuantities] = useState(
    selectedProducts.reduce((quantities, product) => {
      quantities[product.id] = product.quantity;
      return quantities;
    }, {})
  );

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedQuantities = { ...localQuantities, [productId]: newQuantity };
    setLocalQuantities(updatedQuantities);
    onUpdateQuantity(updatedQuantities);
  };

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Book Type</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedProducts ? (
            selectedProducts.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.bookType}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={localQuantities[product.id]}
                    onChange={(e) =>
                      handleQuantityChange(product.id, e.target.value)
                    }
                    InputProps={{ inputProps: { min: 1 } }}
                    sx={{ width: "20%" }}
                  />
                </TableCell>
                <TableCell>
                  ${product.price * localQuantities[product.id]}
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
        </TableBody>
      </Table>
    </Paper>
  );
}
