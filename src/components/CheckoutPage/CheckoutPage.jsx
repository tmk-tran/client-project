import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Paper,
} from "@mui/material";
// ~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~~~~~~~~~
import CustomerInfoForm from "./CustomerInfoForm";
import OrderSummaryDisplay from "./OrderSummaryDisplay";
import Typography from "../Typography/Typography";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { border } from "../Utils/colors";
import PayPalButton from "./PayPalButtons";
import { historyHook } from "../../hooks/useHistory";
import CustomButton from "../CustomButton/CustomButton";

export const containerStyle = {
  width: "50vw",
  minHeight: "94%",
  //   minHeight: "50vh",
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
      <Typography
        label="Order Confirmation"
        variant="h6"
        sx={{ ml: 6, pt: 4 }}
      />
      <hr style={{ width: "90%" }} />
      {/* Add your form fields and other content for step three */}
    </div>
  );
}

export default function CheckoutPage() {
  const location = useLocation();
  const selectedProducts = location.state?.selectedProducts ?? [];
  // Now you can access selectedProducts and use it in your component
  console.log("Selected Products in CheckoutPage:", selectedProducts);
  const orderTotal = location.state?.orderTotal ?? 0;
  console.log(orderTotal);

  const history = historyHook();
  const [activeStep, setActiveStep] = useState(0);
  const [stateSelected, setStateSelected] = useState(false);
  console.log(stateSelected);
  const [isSubmitted, setIsSubmitted] = useState(false);
  console.log(isSubmitted);

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
    console.log("State selected:", stateSelected);
    setIsSubmitted(false);
    handleNext();
    console.log(isSubmitted);
  };

  return (
    <div style={{ minHeight: "85vh" }}>
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
              <Paper elevation={2} sx={containerStyle}>
                {getStepContent(activeStep)}
              </Paper>
            </Grid>
          </Grid>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~ CHECKOUT NAV BUTTONS ~~~~~~~~~~ */}
          <CustomButton
            label="Back"
            disabled={activeStep === 0}
            onClick={handleBack}
          />
          <CustomButton
            label={activeStep === steps.length - 1 ? "Place Order" : "Next"}
            onClick={handleSubmit}
            variant="contained"
          />
          <CustomButton
            label="Return to Store"
            onClick={() => history.push("/order")}
          />
        </div>
        <div style={{ display: "flex", width: "100%", ...border }}>
          {/* ~~~~~~~~~~ Order Summary ~~~~~~~~~~~~~~~~~~~~ */}
          <OrderSummaryDisplay selectedProducts={selectedProducts} />
        </div>
      </Container>
    </div>
  );
}
