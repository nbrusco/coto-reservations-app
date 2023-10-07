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

const authToken = localStorage.getItem("authToken") || "null";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (authToken !== "null") {
        const { status, payload } = await checkUser(authToken);
        if (status === "success") {
          const now = Math.floor(Date.now() / 1000);
          if (payload.exp > now) {
            setUser(payload);
          } else {
            setUser(null);
            localStorage.setItem("authToken", "null");
          }
        } else {
          setUser(null);
          localStorage.setItem("authToken", "null");
        }
      } else {
        setUser(null);
        localStorage.setItem("authToken", "null");
      }
    };

    checkTokenValidity();
  }, []);

  const checkUser = async (token) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/users/", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      return data;
    } catch (error) {
      errorSwal();
    }
  };

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
        const { status, payload } = await checkUser(data.token);

        if (status === "success") {
          setUser(payload);
          localStorage.setItem("authToken", data.token);
          loginSwal();
        }
      } else {
        throw data;
      }
    } catch ({ error }) {
      errorSwal(error);
    }
  };

  const logout = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        "http://localhost:8080/api/v1/users/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        localStorage.setItem("authToken", "null");
        setUser(null);
        logoutSwal();
      }
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
        user,
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