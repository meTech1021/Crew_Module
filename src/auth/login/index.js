/**
=========================================================
* Crew Module React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useContext, useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Crew Module React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import AuthService from "services/auth-service";
import { AuthContext } from "context";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

// Image

function Login() {
  const authContext = useContext(AuthContext);
  const [rememberMe, setRememberMe] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    usernameError: false,
    passwordError: false,
    credentialsErros: false,
    textError: "",
  });

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();


    if (inputs.username.trim().length === 0) {
      setErrors({ ...errors, usernameError: true });
      return;
    }

    if (inputs.password.trim().length < 6) {
      setErrors({ ...errors, passwordError: true });
      return;
    }

    const newUser = { username: inputs.username, password: inputs.password };

    try {
      const response = await AuthService.login(newUser);
      authContext.login(response.token);
    } catch (res) {
      if (res.hasOwnProperty("message")) {
        setErrors({ ...errors, credentialsErros: true, textError: res.message });
      } else {
        setErrors({ ...errors, credentialsErros: true, textError: res.errors[0].detail });
      }
    }

    return () => {
      setInputs({
        username: "",
        password: "",
      });

      setErrors({
        usernameError: false,
        passwordError: false,
        credentialsErros: false,
        textError: "",
      });
    };
  };

  return (
    <IllustrationLayout
      title="Sign In"
      description="Enter your username and password to sign in"
    >
      <MDBox component="form" role="form" method="POST" onSubmit={submitHandler}>
        <MDBox mb={2}>
          <MDInput
            type="username"
            label="username"
            fullWidth
            name="username"
            value={inputs.username}
            onChange={changeHandler}
            error={errors.usernameError}
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="password"
            label="Password"
            fullWidth
            name="password"
            value={inputs.password}
            onChange={changeHandler}
            error={errors.passwordError}
          />
        </MDBox>
        <MDBox display="flex" alignItems="center" ml={-1}>
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Remember me
          </MDTypography>
        </MDBox>
        {errors.credentialsErros && (
          <MDTypography variant="caption" color="error" fontWeight="light">
            {errors.textError}
          </MDTypography>
        )}
        <MDBox mt={4} mb={1}>
          <MDButton variant="gradient" color="info" size="large" fullWidth type="submit">
            sign in
          </MDButton>
        </MDBox>
      </MDBox>
    </IllustrationLayout>
  );
}

export default Login;
