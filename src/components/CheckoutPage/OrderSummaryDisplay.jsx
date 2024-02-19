import { useLocation } from "react-router-dom";
import { Paper } from "@mui/material";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import OrderSummaryTable from "./OrderSummaryTable";
import Typography from "../Typography/Typography";
import { border } from "../Utils/colors";

export default function OrderSummaryDisplay({ customDonation }) {
  const location = useLocation();
  const selectedProducts = location.state?.selectedProducts ?? [];
  // Access to selectedProducts and use in component
  console.log("Selected Products in CheckoutPage:", selectedProducts);
  const products = location.state?.rows ?? [];
  console.log("Products from previous page: ", products);
  console.log(customDonation);

  return (
    <div>
      {/* <Paper
        elevation={3}
        style={{
          // width: "25vw",
          minHeight: "50vh",
          marginTop: "54px",
          backgroundColor: "#f5f5f5",
          // ...border,
        }}
      > */}
        {/* <Typography
          label="Summary"
          variant="h6"
          gutterBottom
          sx={{ p: 3 }}
        /> */}

        {/* Display order summary here */}
        {selectedProducts && selectedProducts.length > 0 ? (
          <>
            <OrderSummaryTable
              selectedProducts={selectedProducts}
              customDonation={customDonation}
              caseType="Summary"
            />
          </>
        ) : (
          <Typography
            label="No products in cart"
            gutterBottom
            sx={{ ml: 6, pt: 4 }}
          />
        )}
      {/* </Paper> */}
    </div>
  );
}
