import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Temporary for patient enquiry testing: keep auth required, skip role checks.
  void allowedRoles;

  return children;
};

export default ProtectedRoute;
