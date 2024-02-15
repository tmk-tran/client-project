import React, { useState } from "react";
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
import CustomerInfoForm from "./CustomerInfoForm";
import { border } from "../Utils/colors";
import PayPalButton from "./PayPalButtons";

export const containerStyle = {
  width: "50vw",
  minHeight: "50vh",
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
      <Typography variant="h6" sx={{ ml: 3, mt: 3 }}>
        Review
      </Typography>
      {/* Add your form fields and other content for step three */}
    </div>
  );
}

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);

  const [isPayPalInitialized, setIsPayPalInitialized] = useState(false);
  console.log(isPayPalInitialized);

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
        return <StepTwo />;
      case 2:
        return <StepThree />;
      default:
        return "Unknown step";
    }
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
              <Grid item xs={12} md={8}>
                <Paper sx={containerStyle}>
                  {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                  {/* ~~~~~~~~~~  Customer Info ~~~~~~~~~~ */}
                  {getStepContent(activeStep)}
                </Paper>
              </Grid>
            </Grid>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~ CHECKOUT NAV BUTTONS ~~~~~~~~~~ */}
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Place Order" : "Next"}
            </Button>
          </div>
          <div style={{ width: "30%", marginLeft: "20px" }}>
            <Paper
              style={{
                width: "25vw",
                minHeight: "50vh",
                marginTop: "30px",
                ...border,
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ p: 3 }}>
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
