import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../pages/layout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
