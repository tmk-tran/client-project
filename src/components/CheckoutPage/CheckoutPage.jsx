import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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
import PayPalButton from "./PayPalButtons";
import Typography from "../Typography/Typography";
import CustomButton from "../CustomButton/CustomButton";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { border } from "../Utils/colors";
import { historyHook } from "../../hooks/useHistory";

export const containerStyle = {
  width: "50vw",
  // minHeight: "94%",
  minHeight: "50vh",
  mt: 3,
  mb: 5,
};

const steps = ["Information", "Payment", "Order Confirmation"];

export default function CheckoutPage() {
  const history = historyHook();
  const location = useLocation();
  console.log(location.state);
  // Access state from URL and use it in component
  const selectedProducts = location.state?.selectedProducts ?? [];
  const orderTotal = location.state?.orderTotal ?? 0;
  const customDonation = location.state?.customDonation ?? 0;
  console.log("Selected Products in CheckoutPage:", selectedProducts);
  console.log(orderTotal);
  console.log(customDonation);

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
    handleNext();
    console.log(isSubmitted);
  };

  return (
    <div>
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
      </Container>
    </div>
  );
}
