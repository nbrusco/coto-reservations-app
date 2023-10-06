import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import PasswordRestore from "../components/PasswordRestore/PasswordRestore";
import PasswordReset from "../components/PasswordReset/PasswordReset";
import ReservationForm from "../components/ReservationForm/ReservationForm";

// Proteger por auth

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/reestablecimiento" element={<PasswordRestore />} />
      <Route path="/restaurar" element={<PasswordReset />} />

      {/* // temporal para testing */}
      <Route path="/reservas" element={<ReservationForm />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
