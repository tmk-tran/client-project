import React, { useState, useEffect, useRef } from "react";
import {
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
import CustomerInfoForm from "./CustomerInfoForm";
import { border } from "../Utils/colors";
import { initPayPalButton } from "./PayPal";
import PayPalButton from "./PayPalButtons";

const steps = [
  "Customer Information",
  "Shipping and Payment",
  "Order Confirmation",
];

function StepTwo() {
  return (
    <Paper>
      <Typography variant="h6">Step Two Content</Typography>
      {/* Add your form fields and other content for step two */}
    </Paper>
  );
}

function StepThree() {
  return (
    <Paper>
      <Typography variant="h6">Step Three Content</Typography>
      {/* Add your form fields and other content for step three */}
    </Paper>
  );
}

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);

    // useEffect(() => {
    //   initPayPalButton();
    // }, []);

  const [isPayPalInitialized, setIsPayPalInitialized] = useState(false);
  console.log(isPayPalInitialized);

//   useEffect(() => {
//     if (!isPayPalInitialized) {
//       initPayPalButton();
//       setIsPayPalInitialized(true);
//     }

//     return () => {
//       // Clean up any PayPal-related resources if needed
//     };
//   }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <CustomerInfoForm />;
      case 1:
        return <PayPalButton />;
      case 2:
        return <StepThree />;
      default:
        return "Unknown step";
    }
  };

  return (
    <div style={{ height: "80vh", ...border }}>
      <Container
        maxWidth="lg"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: 1 }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper>
                  {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                  {/* ~~~~~~~~~~  Customer Info ~~~~~~~~~~ */}
                  {getStepContent(activeStep)}
                </Paper>
              </Grid>
            </Grid>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Place Order" : "Next"}
            </Button>
          </div>
          <div style={{ width: "30%", marginLeft: "20px" }}>
            <Paper>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              {/* Display order summary here */}
            </Paper>
          </div>
        </div>
      </Container>
    </div>
  );
}
