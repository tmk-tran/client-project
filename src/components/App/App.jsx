import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
import Header from "../Header/Header";
import Footer2 from "../Footer2/Footer2";
import Footer3 from "../Footer3/Footer3";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";

import PublicOrgPage from "../PublicOrgPage/PublicOrgPage";
import PublicOrgDetails from "../PublicOrgDetails/PublicOrgDetails";
import GlobalFundraiserInput
  from "../GlobalFundraiserInput/GlobalFundraiserInput";
// Theme establishing global color for MUI

// ~~~~~~~~~~ Hooks ~~~~~~~~~~
// import { dispatchHook } from "../../hooks/useDispatch";
// import { User } from "../../hooks/reduxStore";

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

  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth.data);
  const user = useSelector((store) => store.user);
console.log(user)

  useEffect(() => {
    dispatch({ type: "FETCH_USER", payload: auth });
  }, [dispatch]);

  useEffect(() => {

    dispatch({ type: "FETCH_COUPON_BOOKS", payload: auth})
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

            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/publicOrgs"
            >
              <PublicOrgPage />
            </Route>
            <Route
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/publicOrgDetails/:id"
            >
              <PublicOrgDetails />
            </Route>
            <ProtectedRoute
              exact 
              path="/OrgDetails/:id">
              <OrgDetails />

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

            <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            >
              <UserPage exact
                path="/user" />
            </ProtectedRoute>


            <ProtectedRoute exact path="/coupon">
              <CouponDesign />
            </ProtectedRoute>

            <ProtectedRoute exact path="/tasks">
              {/* <TaskList /> */}
            </ProtectedRoute>

            <ProtectedRoute exact path="/new">
              {/* <Header /> */}
              {/* <Footer2 /> */}
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
