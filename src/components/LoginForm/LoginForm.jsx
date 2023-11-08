import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LogoPSG from "../LogoPSG/LogoPSG";

import {
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <>
      <LogoPSG />
      <br />
      {/* Default form with template */}
      <form className="formPanel" onSubmit={login}>
        <h2>Login</h2>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <div>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Log In" />
        </div>
      </form>

      {/* Added new login form MUI styled */}
      <form className="formPanel" onSubmit={login}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" style={{ fontWeight: "bold" }}>
              Login
            </Typography>
            <br />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                type="text"
                label="Username"
                name="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              >
                Username
              </TextField>
              <TextField
                type="password"
                label="Password"
                name="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              >
                Username
              </TextField>
            </div>
            <br />
            <div>
              <Button variant="contained" onClick={login}>Log In</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </>
  );
}

export default LoginForm;
