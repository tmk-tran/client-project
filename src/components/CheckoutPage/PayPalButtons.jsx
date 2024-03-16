import React, { useState } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Typography } from "@mui/material";

// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

function PayPalButton({ selectedProducts, customDonation, orderSuccess }) {
  console.log(selectedProducts);
  console.log(customDonation);
  console.log(process.env.REACT_APP_PAYPAL_CLIENT_ID);

  // Removed 'venmo' from "enable-funding"
  const initialOptions = {
    "client-id":
      // "AXW1Fk6t36VzplCt2ev6VRwygaNynFd4tz4KBWicOhfvFrPLenoFFcwIbgih38FpabvP9I6RXFfyZ_Nx",
      process.env.REACT_APP_PAYPAL_CLIENT_ID,
    "enable-funding": "paylater,card",
    "disable-funding": "",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };

  const [message, setMessage] = useState("");

  return (
    <div className="PayPalButton" style={{ marginTop: "5%", width: "50%" }}>
      <Typography>Please select a payment method:</Typography>

      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
          }}
          // createOrder={async () => {
          //   try {
          //     const requestBody = {
          //       cart: selectedProducts.map((product) => ({
          //         id: product.id,
          //         quantity: product.quantity,
          //       })),
          //     };

          //     console.log("Request Body:", requestBody);

          //     const response = await fetch("/api/orders", {
          //       method: "POST",
          //       headers: {
          //         "Content-Type": "application/json",
          //       },
          //       // use the "body" param to optionally pass additional order information
          //       // like product ids and quantities
          //       // body: JSON.stringify({
          //       //   cart: [
          //       //     {
          //       //       id: "YOUR_PRODUCT_ID",
          //       //       quantity: "YOUR_PRODUCT_QUANTITY",
          //       //     },
          //       //   ],
          //       // }),
          //       body: JSON.stringify(requestBody),
          //     });
          //     console.log(response);

          //     const orderData = await response.json();
          //     console.log(orderData);

          //     if (orderData.id) {
          //       return orderData.id;
          //     } else {
          //       const errorDetail = orderData?.details?.[0];
          //       const errorMessage = errorDetail
          //         ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          //         : JSON.stringify(orderData);

          //       throw new Error(errorMessage);
          //     }
          //   } catch (error) {
          //     console.error(error);
          //     console.log(error);
          //     setMessage(`Could not initiate PayPal Checkout...${error}`);
          //   }
          // }}
          createOrder={async () => {
            try {
              const requestBody = {
                cart: selectedProducts.map((product) => ({
                  id: product.id,
                  quantity: product.quantity,
                })),
              };
          
              console.log("Request Body:", requestBody);
          
              const response = await axios.post("/api/orders", requestBody, {
                headers: {
                  "Content-Type": "application/json",
                },
              });
          
              console.log(response);
          
              const orderData = response.data;
              console.log(orderData);
          
              if (orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);
          
                throw new Error(errorMessage);
              }
            } catch (error) {
              console.error(error);
              console.log(error);
              setMessage(`Could not initiate PayPal Checkout...${error}`);
            }
          }}
          
          // onApprove={async (data, actions) => {
          //   try {
          //     const response = await fetch(
          //       `/api/orders/${data.orderID}/capture`,
          //       {
          //         method: "POST",
          //         headers: {
          //           "Content-Type": "application/json",
          //         },
          //       }
          //     );

          //     const orderData = await response.json();
          //     // Three cases to handle:
          //     //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          //     //   (2) Other non-recoverable errors -> Show a failure message
          //     //   (3) Successful transaction -> Show confirmation or thank you message

          //     const errorDetail = orderData?.details?.[0];

          //     if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
          //       // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          //       // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
          //       return actions.restart();
          //     } else if (errorDetail) {
          //       // (2) Other non-recoverable errors -> Show a failure message
          //       throw new Error(
          //         `${errorDetail.description} (${orderData.debug_id})`
          //       );
          //     } else {
          //       // (3) Successful transaction -> Show confirmation or thank you message
          //       // Or go to another URL:  actions.redirect('thank_you.html');
          //       const transaction =
          //         orderData.purchase_units[0].payments.captures[0];
          //       setMessage(
          //         `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
          //       );
          //       console.log(
          //         "Capture result",
          //         orderData,
          //         JSON.stringify(orderData, null, 2)
          //       );
          //     }
          //   } catch (error) {
          //     console.error(error);
          //     setMessage(
          //       `Sorry, your transaction could not be processed...${error}`
          //     );
          //   }
          // }}
          onApprove={async (data, actions) => {
            try {
              const response = await axios.post(
                `/api/orders/${data.orderID}/capture`,
                {},
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const orderData = response.data;
              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // Recoverable INSTRUMENT_DECLINED
                return actions.restart();
              } else if (errorDetail) {
                // Other non-recoverable errors
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`
                );
              } else {
                // Successful transaction
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];
                setMessage(
                  `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                );
                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2)
                );
                orderSuccess(orderData);
              }
            } catch (error) {
              console.error(error);
              setMessage(
                `Sorry, your transaction could not be processed...${error}`
              );
            }
          }}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

export default PayPalButton;
