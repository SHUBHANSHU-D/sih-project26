import { Navigate } from "react-router-dom";

function RoleRoute({ allowedRole, children }) {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  const userRole =
    localStorage.getItem("userRole");

  // User is not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // User has the correct role
  if (userRole === allowedRole) {
    return children;
  }

  // Redirect to the correct dashboard
  if (userRole === "buyer") {
    return (
      <Navigate
        to="/buyer-dashboard"
        replace
      />
    );
  }

  if (userRole === "supply-partner") {
    return (
      <Navigate
        to="/supply-partner-dashboard"
        replace
      />
    );
  }

  if (userRole === "logistics-partner") {
    return (
      <Navigate
        to="/logistics-dashboard"
        replace
      />
    );
  }

  // Unknown role
  return <Navigate to="/login" replace />;
}

export default RoleRoute;