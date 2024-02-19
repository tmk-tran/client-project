import React from "react";
import Typography from "@mui/material/Typography";

export default function TotalUpdate({
  selectedProducts,
  customDonation,
  onChange,
}) {
  
  const total = selectedProducts.reduce(
    (acc, product) =>
      product.id === 4 || product.bookType === "Donate"
        ? acc + Number(customDonation)
        : acc + product.price * product.quantity,
    0
  );

  onChange(total);

  return (
    <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
      Order Total: ${total}
    </Typography>
  );
}
