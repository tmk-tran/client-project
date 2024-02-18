import React, { useState } from "react";
import { useLocation } from "react-router-dom";
// ~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~~~~~~~~~
import OrderSummaryTable from "./OrderSummaryTable";
import TotalUpdate from "./TotalUpdate";
import CustomButton from "../CustomButton/CustomButton";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { historyHook } from "../../hooks/useHistory";

export const containerStyle = {
  minHeight: "80vh",
  width: "70%",
  margin: "0 auto",
};

export default function OrderSummary() {
  const location = useLocation();
  const history = historyHook();
  const [selectedProducts, setSelectedProducts] = useState(
    location.state?.selectedProducts ?? []
  );
  console.log("Selected Products in CheckoutPage:", selectedProducts);
  const [orderTotal, setOrderTotal] = useState(0);
  console.log(orderTotal);

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
    <div style={containerStyle}>
      <OrderSummaryTable
        selectedProducts={selectedProducts}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <TotalUpdate
        selectedProducts={selectedProducts}
        onChange={(total) => {
          setOrderTotal(total);
        }}
      />
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
