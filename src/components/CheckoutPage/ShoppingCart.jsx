import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Paper } from "@mui/material";
// ~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~~~~~~~~~
import OrderSummaryTable from "./OrderSummaryTable";
import TotalUpdate from "./TotalUpdate";
import CustomButton from "../CustomButton/CustomButton";
import Typography from "../Typography/Typography";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { historyHook } from "../../hooks/useHistory";
import { containerStyle } from "../Utils/pageStyles";
import { border } from "../Utils/colors";
import { submitPaymentSweetAlert } from "../Utils/sweetAlerts";

export default function ShoppingCart() {
  const location = useLocation();
  console.log(location);
  const history = historyHook();
  const seller = location.state?.seller ?? [];
  console.log(seller);
  const sellerId = location.state?.sellerId ?? "";
  console.log(sellerId);
  const refId = seller.refId ?? "";
  console.log(refId);
  const caseType = location.state?.caseType ?? [];
  console.log(caseType);
  const [selectedProducts, setSelectedProducts] = useState(
    location.state?.selectedProducts ?? []
  );
  console.log("Selected Products in CheckoutPage:", selectedProducts);
  const [orderTotal, setOrderTotal] = useState(0);
  console.log(orderTotal);
  const [customDonation, setCustomDonation] = useState(
    location.state?.customDonation ?? 0
  );
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
    history.push({
      pathname: `/seller/${refId}/${caseType}/checkout`,
      state: { selectedProducts, orderTotal, customDonation },
    });
  };

  const submitOrder = (caseType) => {
    console.log(caseType);

    const saveCall = () => {
      const updateAction = {
        type: `UPDATE_${caseType.toUpperCase()}`,
        payload: {
          id: sellerId,
          refId: refId,
          [caseType.toLowerCase()]: Number(orderTotal),
          updateType: caseType.toLowerCase(),
        },
      };
      console.log("Dispatching action:", updateAction);
      // dispatch(updateAction);
    };

    submitPaymentSweetAlert(saveCall);
  };

  return (
    <div style={containerStyle}>
      <div
        style={{
          marginTop: "53px",
          marginBottom: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* ~~~~~~~~~~ HEADER ~~~~~~~~~~~~~ */}
        <Typography
          label="Shopping Cart"
          variant="h5"
          sx={{ pt: 2, mb: 5, fontWeight: "bold" }}
        />
        {/* ~~~~~~~~~~ ORDER ~~~~~~~~~~~~~ */}
        {selectedProducts.length > 0 ? (
          <OrderSummaryTable
            selectedProducts={selectedProducts}
            customDonation={customDonation}
            setCustomDonation={setCustomDonation}
            onUpdateQuantity={handleUpdateQuantity}
          />
        ) : (
          <Typography label="No items in cart" />
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
        {/* {!caseType ? (
          <CustomButton
            label="Proceed to Checkout"
            onClick={toCheckout}
            variant="contained"
          />
        ) : (
          <CustomButton
            label="Submit Order"
            onClick={() => submitOrder(caseType)}
            variant="contained"
          />
        )} */}
        {!caseType ? (
          <CustomButton
            label="Proceed to Checkout"
            onClick={toCheckout}
            variant="contained"
          />
        ) : (
          <>
            {caseType === "cash" && (
              <CustomButton
                label="Submit Order"
                onClick={() => submitOrder("cash")}
                variant="contained"
              />
            )}
            {caseType === "paypal" && (
              <CustomButton
                label="Proceed to Checkout"
                onClick={() => toCheckout()}
                variant="contained"
              />
            )}
            {caseType === "credit" && (
              <CustomButton
                label="Proceed to Checkout"
                onClick={() => toCheckout()}
                variant="contained"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
