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

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Crew Module React components
import MDBox from "components/MDBox";

// Settings page components
import Header from "cruds/user-profile/components/Header";
import BasicInfo from "cruds/user-profile/components/BasicInfo";
import ChangePassword from "cruds/user-profile/components/ChangePassword";
import DashboardLayout from "utils/LayoutContainers/DashboardLayout";
import DashboardNavbar from "utils/Navbars/DashboardNavbar";

import AuthService from "services/auth-service";
import getId from "services/helper-service";
import Footer from "utils/Footer";

function UserProfile() {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    newPassword: "",
    currentPassword: "",
    confirmPassword: "",
    profile_image: "",
  });

  useEffect(() => {
    (async () => {
      const response = await AuthService.getProfile();
      setUser((prevUser) => ({
        ...prevUser,
        id: response.data.id,
        name: response.data.attributes.name,
        email: response.data.attributes.email,
        profile_image: response.data.attributes.profile_image,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    })();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={4}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={9}>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Header user={user} />
                </Grid>
                <Grid item xs={12}>
                  <BasicInfo user={user} />
                </Grid>
                <Grid item xs={12}>
                  <ChangePassword user={user} />
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default UserProfile;
