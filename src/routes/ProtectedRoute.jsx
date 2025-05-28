import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken } from "../utils/auth";

export default function ProtectedRoute() {
  const isAuthenticated = !!getToken();
  const { pathname } = useLocation();

  const publicRoutes = ["/login", "/register"];
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isAuthenticated && isPublicRoute) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!isAuthenticated && !isPublicRoute) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
