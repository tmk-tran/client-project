import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Nav from "../Nav/Nav";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import UserProfile from "../UserProfile/UserProfile";
import AboutPage from "../AboutPage/AboutPage";
import HomePage from "../HomePage/HomePage";
import Details from "../Details/Details";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import Footer from "../Footer/Footer";
import GroupDetails from "../GroupDetails/GroupDetails";
import MenuLinks from "../MenuLinks/MenuLinks";
import ArchivedOrganizations from "../ArchivedOrganizations/ArchivedOrganizations";
import GlobalFundraiserInput from "../GlobalFundraiserInput/GlobalFundraiserInput";
import CouponDesign from "../CouponDesign/CouponDesign";
import Header from "../Header/Header";
import Footer2 from "../Footer2/Footer2";
import Footer3 from "../Footer3/Footer3";
import TaskTabs from "../TaskTabs/TaskTabs";
import CouponReviewDetails from "../CouponReviewDetails/CouponReviewDetails";
import CheckoutPage from "../CheckoutPage/CheckoutPage";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";
import { User } from "../../hooks/reduxStore";

// ~~~~~ Theme establishing global color for MUI ~~~~~
const theme = createTheme({
  typography: {
    fontSize: 18,
    // fontFamily: 'Lato, "Helvetica Neue", Arial, sans-serif',
    fontFamily: "Helvetica Neue",
  },
  palette: {
    primary: {
      // main: "#273b91", // Set to PSG brand blue
      main: "#19338E",
    },
    secondary: {
      main: "#198E19",
    },
  },
});
// ~~~~~ end theme ~~~~~

function App() {
  const dispatch = dispatchHook();
  const user = User();

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: "FETCH_COUPON_BOOKS" });
  }, [user]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div>
          {/* <Nav /> */}
          <Header />
          <MenuLinks />
          <Switch>
            <Redirect exact from="/" to="/home" />

            <Route exact path="/about">
              <AboutPage />
            </Route>

            <ProtectedRoute exact path="/user">
              <HomePage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/userProfile/:id">
              <UserProfile />
            </ProtectedRoute>

            <ProtectedRoute exact path="/archivedOrganizations">
              <ArchivedOrganizations />
            </ProtectedRoute>

            <ProtectedRoute exact path="/group/:id">
              <GroupDetails user={user} />
            </ProtectedRoute>

            <ProtectedRoute exact path="/newFundraiser">
              <GlobalFundraiserInput />
            </ProtectedRoute>

            <ProtectedRoute exact path="/coupon">
              <CouponDesign />
            </ProtectedRoute>

            <ProtectedRoute exact path="/tasks">
              <TaskTabs />
            </ProtectedRoute>

            {/* ProtectedRoute for /tasks with dynamic tab parameter */}
            <ProtectedRoute path="/tasks/:tab" component={TaskTabs} />

            <ProtectedRoute exact path="/orgDetails/:id">
              <Details
                isMerchantTaskPage={false}
                isTaskPage={false}
                isMerchantDetails={false}
              />
            </ProtectedRoute>

            {/* UPDATE THIS WITH CORRECT ID IN OrgTaskDetails */}
            <ProtectedRoute exact path="/organizationTaskDetails/:id">
              <Details
                isMerchantTaskPage={false}
                isTaskPage={true}
                isMerchantDetails={false}
              />
            </ProtectedRoute>

            {/* UPDATE THIS WITH CORRECT ID IN MerchantTaskDetails */}
            <ProtectedRoute exact path="/merchantTaskDetails/:id">
              <Details
                isMerchantTaskPage={true}
                isTaskPage={false}
                isMerchantDetails={true}
              />
            </ProtectedRoute>

            <ProtectedRoute exact path="/coupon/:id">
              <CouponReviewDetails />
            </ProtectedRoute>

            <ProtectedRoute exact path="/checkout">
              <CheckoutPage />
            </ProtectedRoute>

            <Route exact path="/login">
              {user.id ? (
                // If the user is already logged in,
                // redirect to the /user page
                <Redirect to="/user" />
              ) : (
                // Otherwise, show the login page
                <LoginPage />
              )}
            </Route>

            <Route exact path="/registration">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to the /user page
                <Redirect to="/user" />
              ) : (
                // Otherwise, show the registration page
                <RegisterPage />
              )}
            </Route>

            <Route exact path="/home">
              {user.id ? <Redirect to="/user" /> : <LoginPage />}
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
        </div>
        {/* <Footer /> */}
        {/* <Footer2 /> */}
        <Footer3 />
      </ThemeProvider>
    </Router>
  );
}

export default App;
