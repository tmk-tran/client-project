import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  Paper,
} from "@mui/material";
// ~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~~~~~~~~~
import CustomerInfoForm from "./CustomerInfoForm";
import OrderSummaryTable from "./OrderSummaryTable";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { border } from "../Utils/colors";
import PayPalButton from "./PayPalButtons";
import { historyHook } from "../../hooks/useHistory";

export const containerStyle = {
  width: "50vw",
  minHeight: "50vh",
  mt: 3,
  mb: 5,
};

const steps = ["Information", "Payment", "Order Confirmation"];

function StepTwo() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <PayPalButton />
    </Box>
  );
}

function StepThree() {
  return (
    <div>
      <Typography variant="h6" sx={{ ml: 6, pt: 4 }}>
        Review
      </Typography>
      <hr style={{ width: "90%" }} />
      {/* Add your form fields and other content for step three */}
    </div>
  );
}

export default function CheckoutPage() {
  const location = useLocation();
//   const { selectedProducts } = location.state;
//   // Now you can access selectedProducts and use it in your component
//   console.log(
//     "Selected Products in CheckoutPage:",
//     selectedProducts ? selectedProducts : "No selectedProducts..."
//   );
  const selectedProducts = location.state?.selectedProducts ?? [];
  // Now you can access selectedProducts and use it in your component
  console.log("Selected Products in CheckoutPage:", selectedProducts);

  const history = historyHook();
  const [activeStep, setActiveStep] = useState(0);

  const [isPayPalInitialized, setIsPayPalInitialized] = useState(false);
  console.log(isPayPalInitialized);
  const [stateSelected, setStateSelected] = useState(false);
  console.log(stateSelected);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        return <StepTwo />;
      case 2:
        return <StepThree />;
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
    console.log("State selected:", selectedState);
    setIsSubmitted(false);
    handleNext();
    console.log(isSubmitted);
  };

  return (
    <div style={{ minHeight: "85vh" }}>
      <Container
        maxWidth="lg"
        style={{ display: "flex", flexDirection: "column", marginTop: 12 }}
      >
        <div style={{ display: "flex", width: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Grid container spacing={3}>
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* ~~~~~~~ RENDERED STEPPER CONTENT ~~~~~~~ */}
              <Grid item xs={12} md={8}>
                <Paper elevation={2} sx={containerStyle}>
                  {getStepContent(activeStep)}
                </Paper>
              </Grid>
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~ CHECKOUT NAV BUTTONS ~~~~~~~~~~ */}
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {activeStep === steps.length - 1 ? "Place Order" : "Next"}
            </Button>
            <Button onClick={() => history.push("/order")}>
              Return to Store
            </Button>
          </div>
          <div style={{ width: "30%", marginLeft: "20px" }}>
            <Paper
              elevation={4}
              style={{
                width: "25vw",
                minHeight: "50vh",
                marginTop: "53px",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ p: 3 }}>
                Order Summary
              </Typography>
              {/* Display order summary here */}
              {selectedProducts ? (
                selectedProducts.map((product, i) => (
                  <div key={i}>
                    {/* <Typography sx={{ p: 3 }}>
                      {product.bookType}
                    </Typography>
                    <Typography gutterBottom sx={{ p: 3 }}>
                      ${product.price}
                    </Typography>
                    <Typography gutterBottom sx={{ p: 3 }}>
                      Quantity: {product.quantity}
                    </Typography> */}
                    <OrderSummaryTable selectedProducts={selectedProducts} />
                  </div>
                ))
              ) : (
                <Typography variant="h6" gutterBottom sx={{ p: 3 }}>
                  No products selected.
                </Typography>
              )}
            </Paper>
          </div>
        </div>
      </Container>
    </div>
  );
}
