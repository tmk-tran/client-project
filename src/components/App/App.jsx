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
import UserPage from "../UserPage/UserPage";
import OrgDetails from "../OrgDetails/OrgDetails";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import Footer from "../Footer/Footer";
import GroupDetails from "../GroupDetails/GroupDetails";
import MenuLinks from "../MenuLinks/MenuLinks";
import ArchivedOrganizations from "../ArchivedOrganizations/ArchivedOrganizations";
import GlobalFundraiserInput from "../GlobalFundraiserInput/GlobalFundraiserInput";
import CouponDesign from "../CouponDesign/CouponDesign";
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
      main: "#273b91", // Set to PSG brand blue
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
          <Nav />
          <MenuLinks />
          <Switch>
            <Redirect exact from="/" to="/home" />

            <Route exact path="/about">
              <AboutPage />
            </Route>

            <ProtectedRoute exact path="/user">
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/userProfile/:id">
              <UserProfile />
            </ProtectedRoute>

            <ProtectedRoute exact path="/archivedOrganizations">
              <ArchivedOrganizations />
            </ProtectedRoute>

            <ProtectedRoute exact path="/orgDetails/:id">
              <OrgDetails />
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
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
