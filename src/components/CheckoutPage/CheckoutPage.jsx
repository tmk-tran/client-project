import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  useTheme,
  useMediaQuery,
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
import CustomTypography from "../Typography/Typography";
import CustomButton from "../CustomButton/CustomButton";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { historyHook } from "../../hooks/useHistory";
import { navButtonStyle } from "./checkoutStyles";
import {
  sellerPageInfo,
  Errors,
  appActiveYear,
  CustomerAdded,
} from "../../hooks/reduxStore";
import { dispatchHook } from "../../hooks/useDispatch";
import { backgroundColor, primaryColor, secondaryColor } from "../Utils/colors";

export const containerStyle = {
  width: "50vw",
  // minHeight: "94%",
  minHeight: "50vh",
  mt: 3,
  mb: 5,
};

const steps = ["Information", "Payment", "Order Confirmation"];

export default function CheckoutPage({ caseType }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const history = historyHook();
  const location = useLocation();
  const dispatch = dispatchHook();

  const paramsObject = useParams();
  const refId = paramsObject.refId;
  // Access state from URL and use it in component //
  const selectedProducts = location.state?.selectedProducts ?? [];
  const bookTypeArray = selectedProducts.map((product) => product.bookType);
  const orderTotal = location.state?.orderTotal ?? 0;
  const customDonation = location.state?.customDonation ?? 0;
  // Access digital payment amount //
  let digitalPayment;
  digitalPayment = orderTotal - customDonation;

  const [physicalCouponBook, setPhysicalCouponBook] = useState(false);
  // Number of books sold //
  const [physicalBookDigital, setPhysicalBookDigital] = useState(0);
  const [digitalBookCredit, setDigitalBookCredit] = useState(0);
  const [digitalDonation, setDigitalDonation] = useState(0);

  const [activeStep, setActiveStep] = useState(0);
  const [stateSelected, setStateSelected] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ~~~~~ Store Data ~~~~~ //
  const sellerData = sellerPageInfo() || [];
  const orgId = sellerData ? sellerData[0].organization_id : "";
  const sellerId = sellerData ? sellerData[0].id : "";
  const currentYear = appActiveYear() || [];
  const activeYearId = currentYear ? currentYear[0].id : "";
  // const errorStore = Errors();
  const errorState = Errors();
  const errorStore = errorState.errorReducer.errorMessage;

  // ~~~~~~~~~~ Form state ~~~~~~~~~~ //
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailChanged, setEmailChanged] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [unit, setUnit] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  // ~~~~~ Error State ~~~~~ //
  const [errors, setErrors] = useState({});

  // ~~~~~~~~~~ Order Info ~~~~~~~~~~ //
  const [orderInfo, setOrderInfo] = useState(null);

  // Active Campaign Dispatch ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  //
  const acInfo = () => {
    const contactData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address: address,
      unit: unit,
      city: city,
      state: stateSelected,
      zip: zip,
      organization: sellerData[0].organization_name,
      url: "testpsg.fly.dev/fargo/coupon",
      year: currentYear[0].year,
      donation: customDonation,
      bookType: bookTypeArray,
      type: caseType,
    };
    // console.log("Contact Data from acInfo", contactData);
    dispatch({ type: "ADD_CONTACT", payload: contactData });
  };

  useEffect(() => {
    let physicalDigital = 0;
    let donationAmount = 0;
    let digitalCredit = 0;

    selectedProducts.forEach((product) => {
      if (product.bookType === "Physical Coupon Book") {
        switch (caseType) {
          // case "cash":
          //   setPhysicalBook(true);
          //   break;
          case "credit":
            setPhysicalCouponBook(true);
            physicalDigital += product.quantity;
            break;
          default:
            break;
        }
      } else if (product.bookType === "Donate") {
        switch (caseType) {
          case "credit":
            donationAmount += customDonation;
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

    setPhysicalBookDigital(physicalDigital);
    setDigitalBookCredit(digitalCredit);
    setDigitalDonation(donationAmount);
  }, [selectedProducts, caseType]);

  useEffect(() => {
    if (errorStore) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailCheck: errorStore,
      }));
    }
  }, [errorStore]);

  const handleStateChange = (state, value) => {
    // Handle the state change in the parent component
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
            isMobile={isMobile}
            handleStateChange={handleStateChange}
            isSubmitted={isSubmitted}
            errors={errors}
            setErrors={setErrors}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            address={address}
            setAddress={setAddress}
            unit={unit}
            setUnit={setUnit}
            city={city}
            setCity={setCity}
            stateSelected={stateSelected}
            zip={zip}
            setZip={setZip}
            setFormSubmitted={setFormSubmitted}
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
              refId={refId}
              selectedProducts={selectedProducts}
              customDonation={customDonation}
              orderSuccess={handleOrderInfo}
            />
          </Box>
        );
      case 2:
        return (
          <div>
            <Box
              sx={{
                textAlign: "center",
                py: 3,
                mb: 2,
                color: "ghostwhite",
                backgroundColor: backgroundColor.color,
              }}
            >
              <CustomTypography
                label="Almost there! Please click 'Complete Order' to finalize your purchase"
                variant="body1"
                sx={{ fontWeight: "bold" }}
              />
              <CustomTypography
                label="*If you do not click the 'Complete Order' button, your purchase will not be completed, and you will not receive your order"
                variant="caption"
                sx={{
                  textAlign: "center",
                  mb: 3,
                  color: "lightgray",
                }}
              />
            </Box>
            <CustomTypography
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

  const handleForm = async () => {
    const newErrors = {};
    if (!firstName) {
      newErrors.firstName = "Please enter your first name";
    }
    if (!lastName) {
      newErrors.lastName = "Please enter your last name";
    }
    if (!email) {
      newErrors.email = "Email required";
    }
    if (!phone) {
      newErrors.phone = "Phone required";
    }
    if (!address) {
      newErrors.address = "Please enter address";
    }
    if (!city) {
      newErrors.city = "Please enter city";
    }
    if (!stateSelected) {
      setIsSubmitted(true);
      return;
    }
    if (!zip) {
      newErrors.zip = "Please enter zip code";
    }

    setErrors(newErrors);
    // Check if there are any errors
    const hasErrors = Object.keys(newErrors).length > 0;
    // For state validation
    !hasErrors && setIsSubmitted(true);

    if (Object.keys(newErrors).length === 0) {
      try {
        await saveCustomerInfo();
        // setFormSubmitted(true);
        // No action here...
      } catch (error) {
        console.error("Failed to save customer info:", error);
      }
    }
  };

  // ~~~ State for adding a customer ~~~ //
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formStatus = CustomerAdded();

  // useEffect to run runHandleNext
  useEffect(() => {
    if (formSubmitted && formStatus.customerAddedSuccessfully === true) {
      runHandleNext();
      setFormSubmitted(false);
    }
  }, [errorStore, formStatus]);

  const runHandleNext = () => {
    if (Object.keys(errors).length === 0 && !errorStore) {
      handleNext();
    }
  };

  const returnToStore = () => {
    history.push(`/seller/${refId}/${caseType}`);
  };

  const setDigitalBook = (value) => ({
    type: "SET_DIGITAL_BOOK",
    payload: value,
  });

  const setPhysicalBook = (value) => ({
    type: "SET_PHYSICAL_BOOK",
    payload: value,
  });

  const handleSubmit = () => {
    // Check if this is the last step in the process
    if (activeStep === steps.length - 1) {
      // This is the last step, update transactions
      updateTransactions();
      if (digitalBookCredit) {
        dispatch(setDigitalBook(true));
      }
      if (physicalCouponBook) {
        dispatch(setPhysicalBook(true));
      }
      // Send payload to Active Campaign
      acInfo();
      // Redirect the user to a confirmation page
      history.push(`/seller/${refId}/complete`);
    } else {
      // This is not the last step, move to the next step
      handleNext();
    }
  };

  // const updateTransactions = () => {
  //   const updateAction = {
  //     type: "UPDATE_BOOKS_SOLD",
  //     payload: {
  //       refId: refId,
  //       orgId: orgId,
  //       yearId: activeYearId,
  //       physical_book_cash: 0,
  //       physical_book_digital: physicalBookDigital,
  //       digital_book_credit: digitalBookCredit,
  //     },
  //   };
  //   let updateActions = [updateAction];

  //   customDonation > 0 &&
  //     updateActions.push({
  //       type: "UPDATE_DONATIONS",
  //       payload: {
  //         updateType: "digital_donations",
  //         id: sellerId,
  //         refId: refId,
  //         digital_donations: customDonation,
  //         orgId: orgId,
  //         yearId: activeYearId,
  //       },
  //     });

  //   orderTotal > 0 &&
  //     updateActions.push({
  //       type: "UPDATE_DIGITAL_PAYMENTS",
  //       payload: {
  //         updateType: "digital",
  //         id: sellerId,
  //         refId: refId,
  //         digital: digitalPayment,
  //         orgId: orgId,
  //         yearId: activeYearId,
  //       },
  //     });

  //   updateActions.forEach((action) => dispatch(action));
  // };

  const updateTransactions = () => {
    const updateAction = {
      type: "UPDATE_BOOKS_SOLD",
      payload: {
        refId: refId,
        orgId: orgId,
        yearId: activeYearId,
        physical_book_cash: 0,
        physical_book_digital: physicalBookDigital,
        digital_book_credit: digitalBookCredit,
      },
    };

    let updateActions = [updateAction];

    if (customDonation > 0) {
      const donationAction = {
        type: "UPDATE_DONATIONS",
        payload: {
          updateType: "digital_donations",
          id: sellerId,
          refId: refId,
          digital_donations: customDonation,
          orgId: orgId,
          yearId: activeYearId,
        },
      };
      updateActions.push(donationAction);
    }

    if (orderTotal > 0) {
      const paymentAction = {
        type: "UPDATE_DIGITAL_PAYMENTS",
        payload: {
          updateType: "digital",
          id: sellerId,
          refId: refId,
          digital: digitalPayment,
          orgId: orgId,
          yearId: activeYearId,
        },
      };
      updateActions.push(paymentAction);
    }

    updateActions.forEach((action) => {
      dispatch(action);
    });
  };

  const handleOrderInfo = (orderData) => {
    setOrderInfo(orderData);
    handleNext();
  };

  const saveCustomerInfo = () => {
    const saveAction = {
      type: "ADD_CUSTOMER",
      payload: {
        refId: refId,
        last_name: lastName,
        first_name: firstName,
        email: email,
        phone: phone,
        address: address,
        unit: unit,
        city: city,
        state: stateSelected,
        zip: zip,
      },
    };
    return new Promise((resolve, reject) => {
      try {
        dispatch(saveAction);
        setFormSubmitted(true);
        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

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
            <Paper
              elevation={2}
              sx={{ ...containerStyle, ...(isMobile && { width: "100vw" }) }}
            >
              {getStepContent(activeStep)}
            </Paper>
          </Grid>
        </Grid>
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        {/* ~~~~~~~~~~ CHECKOUT NAV BUTTONS ~~~~~~~~~~ */}
        <Box sx={navButtonStyle}>
          <CustomButton
            label="Return to Store"
            onClick={returnToStore}
            disabled={activeStep === 1 || activeStep === 2 ? true : false}
          />
          <CustomButton
            label={
              activeStep === steps.length - 1 ? "Complete Order" : "Continue"
            }
            onClick={
              activeStep === 0
                ? handleForm // First step, check form info
                : // ~~~ HAD THIS, BUT IT WAS CAUSING AN EXTRA BOOK TO GET ADDED ~~~ //
                // : activeStep === 1
                // ? updateTransactions // If it's the second step, update transactions
                activeStep === 2
                ? handleSubmit // If it's the last step, handle form submission
                : handleNext // Otherwise, move to the next step
            }
            variant="contained"
            disabled={activeStep === 1 ? true : false}
          />
        </Box>
      </div>
    </Container>
  );
}
