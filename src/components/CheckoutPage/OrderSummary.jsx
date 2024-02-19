import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
// ~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~~~~~~~~~
import OrderSummaryTable from "./OrderSummaryTable";
import TotalUpdate from "./TotalUpdate";
import CustomButton from "../CustomButton/CustomButton";
import OrderSummaryDisplay from "./OrderSummaryDisplay";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { historyHook } from "../../hooks/useHistory";
import { border } from "../Utils/colors";

export const containerStyle = {
  minHeight: "80vh",
  width: "70%",
  margin: "0 auto",
};

export default function OrderSummary() {
  const location = useLocation();
  console.log(location.state);
  const history = historyHook();
  const [selectedProducts, setSelectedProducts] = useState(
    location.state?.selectedProducts ?? []
  );
  console.log("Selected Products in CheckoutPage:", selectedProducts);
  const [orderTotal, setOrderTotal] = useState(0);
  console.log(orderTotal);
  const [customDonation, setCustomDonation] = useState(location.state?.customDonation?? 0);
  console.log(customDonation);


  const handleUpdateQuantity = (updatedQuantities) => {
    // Update the state passed through the URL with updatedQuantities
    setSelectedProducts(
      selectedProducts.map((product) =>
        updatedQuantities.hasOwnProperty(product.id)
          ? { ...product, quantity: updatedQuantities[product.id] }
          : product
      )
    );
  };

  const goBack = () => {
    history.goBack();
  };

  const toCheckout = () => {
    // history.push("/checkout");
    history.push({
      pathname: "/checkout",
      state: { selectedProducts, orderTotal },
    });
  };

  return (
    <div style={{ ...containerStyle }}>
      <div style={{ marginTop: "53px", marginBottom: "20px", backgroundColor: "#f5f5f5", }}>
        <Typography variant="h5" sx={{pt: 2, mb: 5, fontWeight: "bold" }}>
          Shopping Cart
        </Typography>
        {selectedProducts.length > 0 ? (
          <OrderSummaryTable
            selectedProducts={selectedProducts}
            customDonation={customDonation}
            setCustomDonation={setCustomDonation}
            onUpdateQuantity={handleUpdateQuantity}
          />
        ) : (
          <Typography>No items in cart</Typography>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "2%",
          }}
        >
          <div style={{ marginRight: 10 }}>
            <TotalUpdate
              selectedProducts={selectedProducts}
              customDonation={customDonation}
              onChange={(total) => {
                setOrderTotal(total);
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <CustomButton label="Back" onClick={goBack} />
        <CustomButton
          label="Proceed to Checkout"
          onClick={toCheckout}
          variant="contained"
        />
      </div>
    </div>
  );
}
