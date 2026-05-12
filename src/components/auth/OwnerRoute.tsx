
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingScreen } from "../ui/LoadingScreen";

export const OwnerRoute = () => {
  const { user, role, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (!user || role !== "owner") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
