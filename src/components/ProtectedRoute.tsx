import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  //!todo add required role for route protecton and authorization
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
