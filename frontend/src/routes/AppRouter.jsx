import { Routes, Route, Navigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import PasswordRestore from "../components/PasswordRestore/PasswordRestore";
import PasswordReset from "../components/PasswordReset/PasswordReset";
import ReservationForm from "../components/ReservationForm/ReservationForm";

// Proteger por auth

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route element={<PublicRoute user={user} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/reestablecimiento" element={<PasswordRestore />} />
      </Route>

      <Route element={<ProtectedRoute user={user} />}>
        <Route path="/reservas" element={<ReservationForm />} />
      </Route>

      <Route path="/restaurar" element={<PasswordReset />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
