
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingScreen } from "../ui/LoadingScreen";
import { env } from "../../lib/env";

export const SuperAdminRoute = () => {
  const { user, role, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (!user || (user.uid !== env.SUPERADMIN_UID && role !== "superadmin")) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
