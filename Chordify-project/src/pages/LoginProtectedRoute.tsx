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
    if (user) navigate("/home");
  }, [user, navigate]);

  if (isLoading) return <div>Loading...</div>;

  return !user ? <>{children}</> : null;
}
