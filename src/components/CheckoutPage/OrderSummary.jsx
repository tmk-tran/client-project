import { useLocation } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import OrderSummaryTable from "./OrderSummaryTable";
import OrderTable from "./OrderTable";

export default function OrderSummary() {
  const location = useLocation();
  const selectedProducts = location.state?.selectedProducts ?? [];
  // Now you can access selectedProducts and use it in your component
  console.log("Selected Products in CheckoutPage:", selectedProducts);
  const products = location.state?.rows?? [];
  console.log("Products from previous page: ", products);
  return (
    // <div style={{ width: "30%", marginLeft: "20px" }}>
    <div style={{ width: "30%", marginLeft: "20px", display: "flex" }}>
        <div>
           {/* <OrderTable rows={products} selectedProducts={selectedProducts} /> */}
        </div>
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
