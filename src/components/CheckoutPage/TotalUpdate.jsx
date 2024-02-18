import React from "react";
import Typography from "@mui/material/Typography";

export default function TotalUpdate({ selectedProducts, onChange }) {
  const total = selectedProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  onChange(total);

  return (
    <Typography variant="h6" gutterBottom>
      Total: ${total}
    </Typography>
  );
}
