import { ReactNode, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function LoginProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) navigate("/home"); // Only navigate if loading is complete and user exists
  }, [user, navigate, isLoading]);

  if (isLoading) return <div>Loading...</div>;

  return !user ? <>{children}</> : null;
}
