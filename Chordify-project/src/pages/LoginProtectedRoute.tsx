import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserProps {
  data: {
    email: string | null;
    role: string | null;
    _id: string | null;
    _v: number | null;
  };
}

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function LoginProtectedRoute({ children }: ProtectedRouteProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("http://localhost:3000/users/checkauth", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          navigate("/login");
          throw new Error("Authentication failed");
        }

        const data: UserProps = await res.json();
        console.log("User fetched:", data);
        setUser(data);

        setIsLoading(false); // This will trigger the useEffect below once state is updated
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    }
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (user?.data) {
      console.log("User state updated:", user);
      // Any additional actions you want to perform after user is set can go here
      if (!user?.data.email) {
        navigate("/login");
      }
    }
  }, [user, navigate]); // This effect runs after `user` is updated

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user?.data && user.data.email ? (
    <>{navigate("/home")}</>
  ) : (
    <>{children}</>
  );
}
