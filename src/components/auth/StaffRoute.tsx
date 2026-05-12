
import { Navigate, Outlet } from "react-router-dom";

export const StaffRoute = () => {
  // Staff auth logic (e.g. checking local storage or context for a staff PIN session)
  const isStaffLoggedIn = localStorage.getItem("staffSession") !== null;

  if (!isStaffLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
