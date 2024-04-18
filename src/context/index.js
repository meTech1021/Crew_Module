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

/**
  This file is used for controlling the global states of the components,
  you can customize the states for the different components here.
*/

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

import CrudService from "services/cruds-service";
import AuthService from "services/auth-service";

// The Crew Module React main context
const CrewModule = createContext();

// the authentication context
export const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  getCurrentUser: () => {},
  getRole: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    setIsAuthenticated(true);
    navigate(location.pathname);
  }, []);

  useEffect(() => {
    if (!token) return;
    console.log(token, 'token')
    navigate(location.pathname);
  }, [isAuthenticated]);

  const login = (newToken) => {
    console.log(newToken, 'newToken')
    localStorage.setItem("token", newToken);
    setIsAuthenticated(true);
    navigate("/user-profile");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/auth/login");
  };

  const getCurrentUser = async () => {
    try {
      const res = await AuthService.getProfile();
      return res.data.id;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const getRole = async () => {
    // first get the current user id
    const id = await getCurrentUser();
    try {
      // second I get the user with role
      const res = await CrudService.getUser(id);
      // const roleId = res.data.relationships.roles.data[0].id;
      const roleId = 1;
      // third check the role id and return the role type
      if (roleId === "1") {
        return "admin";
      }
      if (roleId === 2) {
        return "simple";
      }
      return res.included[0].attributes.name;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, getRole, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Setting custom name for the context which is visible on react dev tools
CrewModule.displayName = "CrewModuleContext";

// Crew Module React reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "WHITE_SIDENAV": {
      return { ...state, whiteSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "DARKMODE": {
      return { ...state, darkMode: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Crew Module React context provider
function CrewModuleControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: false,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    darkMode: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <CrewModule.Provider value={value}>{children}</CrewModule.Provider>;
}

// Crew Module React custom hook for using context
function useCrewModuleController() {
  const context = useContext(CrewModule);

  if (!context) {
    throw new Error(
      "useCrewModuleController should be used inside the CrewModuleControllerProvider."
    );
  }

  return context;
}

// Typechecking props for the CrewModuleControllerProvider
CrewModuleControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (dispatch, value) => dispatch({ type: "WHITE_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });

export {
  AuthContextProvider,
  CrewModuleControllerProvider,
  useCrewModuleController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setDarkMode,
};
