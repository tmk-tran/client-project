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
import "./App.css";

// Theme establishing global color for MUI
const theme = createTheme({
  typography: {
    fontSize: 18,
  },
  palette: {
    primary: {
      main: "#273b91", // Set to PSG brand blue
    },
  },
});
// end theme

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  useEffect(() =>{
    dispatch({ type: "FETCH_COUPON_BOOKS"})
  }, [user])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div>
          <Nav />
          <MenuLinks />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserPage />
            </ProtectedRoute>
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/archivedOrganizations"
            >
              <ArchivedOrganizations />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/orgDetails/:id"
            >
              <OrgDetails />
            </ProtectedRoute>
            <ProtectedRoute exact path="/group/:id">
              <GroupDetails  user={user}/>
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
              {user.id ? (
                // If the user is already logged in,
                // redirect them to the /user page
                <Redirect to="/user" />
              ) : (
                // Otherwise, show the Landing page
                <LandingPage />
              )}
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
