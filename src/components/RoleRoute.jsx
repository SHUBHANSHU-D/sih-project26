import { Navigate } from "react-router-dom";

function RoleRoute({ allowedRole, children }) {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  const userRole =
    localStorage.getItem("userRole");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (userRole === allowedRole) {
    return children;
  }

  
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

  return <Navigate to="/login" replace />;
}

export default RoleRoute;