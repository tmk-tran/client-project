import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LogoPSG from "../LogoPSG/LogoPSG";
import NavLinks from "../NavLinks/NavLinks";

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
      <br />
      <form className="formPanel"> {/* <-- this is default template styling, can remove later */}
        <Card>
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              style={{ fontWeight: "bold" }}
            >
              Account Sign In
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
                style={{marginBottom: "10px"}}
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
                Password
              </TextField>
            </div>
            <br />
            <div>
              <Button variant="contained" onClick={login} fullWidth>
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </>
  );
}

export default LoginForm;
