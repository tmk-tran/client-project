import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from "@mui/material";
// ~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~~~~~~~~~
import CustomerInfoForm from "./CustomerInfoForm";
import OrderSummaryDisplay from "./OrderSummaryDisplay";
import PayPalButtons from "./PayPalButtons";
import Typography from "../Typography/Typography";
import CustomButton from "../CustomButton/CustomButton";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { border } from "../Utils/colors";
import { historyHook } from "../../hooks/useHistory";
import { navButtonStyle } from "./checkoutStyles";
import { sellerPageInfo } from "../../hooks/reduxStore";
import { dispatchHook } from "../../hooks/useDispatch";

export const containerStyle = {
  width: "50vw",
  // minHeight: "94%",
  minHeight: "50vh",
  mt: 3,
  mb: 5,
};

const steps = ["Information", "Payment", "Order Confirmation"];

export default function CheckoutPage({ caseType }) {
  console.log(caseType);
  const history = historyHook();
  const location = useLocation();
  const dispatch = dispatchHook();
  console.log(location.state);
  const paramsObject = useParams();
  console.log(paramsObject);
  const refId = paramsObject.refId;
  console.log(refId);
  // Access state from URL and use it in component
  const selectedProducts = location.state?.selectedProducts ?? [];
  const orderTotal = location.state?.orderTotal ?? 0;
  const customDonation = location.state?.customDonation ?? 0;
  console.log("Selected Products in CheckoutPage:", selectedProducts);
  console.log(orderTotal);
  console.log(customDonation);
  // Number of books sold //
  const [physicalBookDigital, setPhysicalBookDigital] = useState(0);
  const [digitalBookCredit, setDigitalBookCredit] = useState(0);

  const [activeStep, setActiveStep] = useState(0);
  console.log(activeStep);
  const [stateSelected, setStateSelected] = useState(false);
  console.log(stateSelected);
  const [isSubmitted, setIsSubmitted] = useState(false);
  console.log(isSubmitted);

  const sellerData = sellerPageInfo() || [];
  console.log(sellerData);
  const orgId = sellerData[0].organization_id;
  console.log(orgId);
  const sellerId = sellerData[0].id;
  const [orderInfo, setOrderInfo] = useState(null);
  console.log(orderInfo);

  useEffect(() => {
    let physicalDigital = 0;
    let digitalCredit = 0;

    selectedProducts.forEach((product) => {
      if (product.bookType === "Physical Coupon Book") {
        switch (caseType) {
          case "cash":
            physicalCash += product.quantity;
            break;
          case "credit":
            physicalDigital += product.quantity;
            break;
          default:
            break;
        }
      } else if (product.bookType === "Donate") {
        switch (caseType) {
          case "credit":
            digitalCredit = 0;
            break;
          default:
            break;
        }
      } else {
        switch (caseType) {
          case "credit":
            digitalCredit += product.quantity;
            break;
          default:
            break;
        }
      }
    });

    // setPhysicalBookCash(physicalCash);
    setPhysicalBookDigital(physicalDigital);
    setDigitalBookCredit(digitalCredit);
  }, [selectedProducts, caseType]);

  // console.log(physicalBookCash);
  console.log(physicalBookDigital);
  console.log(digitalBookCredit);

  const handleStateChange = (state, value) => {
    // Handle the state change in the parent component
    console.log(state, value);
    !state
      ? alert("Please select a state.")
      : console.log("READY FOR SUBMIT LOGIC HERE");
    setStateSelected(value);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <CustomerInfoForm
            handleStateChange={handleStateChange}
            stateSelected={stateSelected}
            isSubmitted={isSubmitted}
          />
        );
      case 1:
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PayPalButtons
              selectedProducts={selectedProducts}
              customDonation={customDonation}
              orderSuccess={handleOrderInfo}
            />
          </Box>
        );
      case 2:
        return (
          <div>
            <Typography
              label="Order Confirmation"
              variant="h6"
              sx={{ ml: 6, pt: 4 }}
            />
            <hr style={{ width: "90%" }} />
            <OrderSummaryDisplay customDonation={customDonation} />
          </div>
        );
      default:
        return "Unknown step";
    }
  };

  const handleSubmit = () => {
    if (!stateSelected) {
      // Handle error, e.g., display an error message
      console.log("Please select a state.");
      setIsSubmitted(true);
      return;
    }
    // Continue with form submission
    console.log("State selected:", stateSelected);
    setIsSubmitted(false);
    // handleNext();
    console.log(isSubmitted);

    // // Check if this is the last step in the process
    // if (activeStep === steps.length - 1) {
    //   // This is the last step, update transactions
    //   updateTransactions();
    //   // You might also want to redirect the user to a confirmation page
    //   history.push("/confirmation");
    // } else {
    //   // This is not the last step, move to the next step
    //   handleNext();
    // }
  };

  const updateTransactions = () => {
    const updateAction = {
      type: "UPDATE_BOOKS_SOLD",
      payload: {
        refId: refId,
        orgId: orgId,
        physical_book_cash: 0,
        physical_book_digital: physicalBookDigital,
        digital_book_credit: digitalBookCredit,
      },
    };
    let updateActions = [updateAction];

    if (customDonation > 0) {
      const updateSellerTable = {
        type: "UPDATE_DONATIONS",
        payload: {
          updateType: "digital",
          id: sellerId,
          refId: refId,
          digital: customDonation,
          digital_donations: customDonation,
        },
      };
      updateActions.push(updateSellerTable);
    }
    console.log("Dispatching action:", updateActions);
    updateActions.forEach((action) => dispatch(action));
  };

  const handleOrderInfo = (orderData) => {
    console.log(orderData);
    setOrderInfo(orderData);
    // history.push(`/seller/${refId}/paypal/checkout/confirmation`);
    handleNext();
  };
  console.log(orderInfo);

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <div>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~ RENDERED STEPPER CONTENT ~~~~~~~ */}
          <Grid item xs={12} md={8}>
            {/* ~~~~~ Container for content ~~~~~ */}
            <Paper elevation={2} sx={containerStyle}>
              {getStepContent(activeStep)}
            </Paper>
          </Grid>
        </Grid>
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        {/* ~~~~~~~~~~ CHECKOUT NAV BUTTONS ~~~~~~~~~~ */}
        <Box sx={navButtonStyle}>
          {/* <CustomButton
            label="Back"
            disabled={activeStep === 0}
            onClick={handleBack}
          /> */}
          <CustomButton
            label="Return to Store"
            onClick={() => history.push(`/seller/${refId}/${caseType}`)}
          />
          <CustomButton
            label={
              activeStep === steps.length - 1
                ? "Complete Order"
                // : activeStep === steps.length - 2
                // ? "Place Order"
                : "Continue"
            }
            // onClick={
            //   activeStep !== steps.length - 2
            //     ? handleSubmit
            //     : updateTransactions
            // }
            onClick={
              activeStep === steps.length - 1
                ? handleSubmit // If it's the last step, handle form submission
                : activeStep === steps.length - 2
                ? updateTransactions // If it's the second last step, update transactions
                : handleNext // Otherwise, move to the next step
            }
            // onClick={handleSubmit}
            variant="contained"
          />
        </Box>
      </div>
    </Container>
  );
}
