import { useLocation } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import OrderSummaryTable from "./OrderSummaryTable";

export default function OrderSummaryDisplay() {
  const location = useLocation();
  const selectedProducts = location.state?.selectedProducts ?? [];
  // Access to selectedProducts and use in component
  console.log("Selected Products in CheckoutPage:", selectedProducts);
  const products = location.state?.rows ?? [];
  console.log("Products from previous page: ", products);
  
  return (
    <div style={{ width: "30%", marginLeft: "20px" }}>
      <Paper
        elevation={4}
        style={{
          width: "25vw",
          minHeight: "78%",
          // minHeight: "50vh",
          marginTop: "53px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ p: 3 }}>
          Order Summary
        </Typography>
        {/* Display order summary here */}
        {selectedProducts && selectedProducts.length > 0 ? (
          <>
            <OrderSummaryTable selectedProducts={selectedProducts} />
          </>
        ) : (
          <Typography variant="h6" gutterBottom sx={{ p: 3 }}>
            - No products in cart
          </Typography>
        )}
      </Paper>
    </div>
  );
}
