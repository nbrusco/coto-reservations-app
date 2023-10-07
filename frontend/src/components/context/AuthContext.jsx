import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";

import {
  loadingSwal,
  loginSwal,
  errorSwal,
  logoutSwal,
  registerSwal,
  passRecoverySwal,
  passUpdateSwal,
} from "../../services/sweetalert2/swalCalls.js";

export const AuthContext = createContext();

const lastAuth = JSON.parse(localStorage.getItem("isAuthenticated") || false);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated || lastAuth) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  const login = async (values) => {
    try {
      loadingSwal();
      const response = await fetch("http://localhost:8080/api/v1/users/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", true);
        loginSwal();
      } else {
        throw data;
      }
    } catch ({ error }) {
      errorSwal(error);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/v1/users/logout", {
        method: "GET",
      });
      setIsAuthenticated(false);
      localStorage.setItem("isAuthenticated", false);
      logoutSwal();
    } catch (error) {
      errorSwal();
    }
  };

  const register = async (values) => {
    try {
      loadingSwal();
      const response = await fetch(
        "http://localhost:8080/api/v1/users/register",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        registerSwal();
      } else {
        throw data;
      }
    } catch ({ error }) {
      errorSwal(error);
    }
  };

  const restorePass = async (values) => {
    try {
      loadingSwal();
      const response = await fetch(
        "http://localhost:8080/api/v1/users/restore",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        passRecoverySwal();
      } else {
        throw data;
      }
    } catch ({ error }) {
      errorSwal(error);
    }
  };

  const resetPass = async (values) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      values.token = token;

      loadingSwal();
      const response = await fetch(
        "http://localhost:8080/api/v1/users/resetPassword",
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        passUpdateSwal();
      } else {
        throw data;
      }
    } catch ({ error }) {
      errorSwal(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        register,
        restorePass,
        resetPass,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
