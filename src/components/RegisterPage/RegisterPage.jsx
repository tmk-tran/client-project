import React from "react";
import { Button } from "@mui/material";

import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <br />
      {/* Commented out for deployment testing */}
      {/* <RegisterForm /> */}

      <center>
        <h1>This appplication for ADMIN use only</h1>
      </center>
    </div>
  );
}

export default RegisterPage;
