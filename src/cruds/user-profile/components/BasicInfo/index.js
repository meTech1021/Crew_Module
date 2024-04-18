import { useEffect, useState } from "react";

// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Settings page components
import FormField from "layouts/pages/account/components/FormField";

import AuthService from "services/auth-service";

function BasicInfo({ user, isDemo }) {
  const [info, setInfo] = useState({ username: "" });
  const [notification, setNotification] = useState({ value: false, color: "info", message: "" });

  useEffect(() => {
    setInfo({
      username: user.username,
    });
  }, [user]);

  useEffect(() => {
    if (notification.value === true) {
      setTimeout(() => {
        setNotification({ value: false, color: "info", message: "" });
      }, 5000);
    }
  }, [notification]);

  const [errors, setErrors] = useState({
    usernameError: false,
  });

  const changeHandler = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (info.username.trim().length === 0) {
      setErrors({ ...errors, usernameError: true });
      return;
    }

    // set new user data for call
    let userData = {
      data: {
        type: "profile",
        attributes: {
          username: info.username,
          profile_image: user.profile_image ?? null,
        },
      },
    };

    // call api for update
    await AuthService.updateProfile(JSON.stringify(userData));

    // reset errors
    setErrors({
      usernameError: false,
    });

    setNotification({
      value: true,
      color: isDemo ? "secondary" : "info",
      message: isDemo
        ? "You can not update the username in demo version"
        : "Your profile has been updated",
    });
  };

  return (
    <>
      <Card id="basic-info" sx={{ overflow: "visible" }}>
        <MDBox p={3}>
          <MDTypography variant="h5">Basic Info</MDTypography>
        </MDBox>
        <MDBox component="form" pb={3} px={3} method="POST" onSubmit={submitHandler}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <FormField
                label="User Name"
                placeholder="username"
                inputProps={{ type: "username" }}
                name="username"
                value={info.username}
                onChange={changeHandler}
                error={errors.usernameError}
              />
            </Grid>
          </Grid>
          
          <MDBox ml="auto" mt={2} display="flex" justifyContent="flex-end">
            <MDButton variant="gradient" color="dark" size="small" type="submit">
              update
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
      {notification.value === true && (
        <MDAlert color={notification.color} mt="20px">
          <MDTypography variant="body2" color="white">
            {notification.message}
          </MDTypography>
        </MDAlert>
      )}
    </>
  );
}

export default BasicInfo;
