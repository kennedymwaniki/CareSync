import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Outlet, Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  requiredRole: "Doctor" | "Patient" | "Caregiver";
}

const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
