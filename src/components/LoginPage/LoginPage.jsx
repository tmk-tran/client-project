import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import {
  Button,
  Typography,
} from "@mui/material";

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />

      <center style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Not a member?&nbsp;</Typography>
        <Button
          type="button"
          style={{ textDecoration: 'underline' }}
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Create Account
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
