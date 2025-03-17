import { ReactNode, useEffect, useState } from "react";

const serverURL = import.meta.env.VITE_SERVER_URL;
const goToURL = import.meta.env.VITE_GO_TO;

interface ProtectedRouteProps {
  children: ReactNode;
}
export default function LoginProtectedRoute({ children }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  async function checkAuth() {
    try {
      const res = await fetch(`${serverURL}/users/checkcookielogin`, {
        method: "GET",
        credentials: "include",
      });

      console.log("req been sent");
      console.log(res.headers.get("content-type"));

      const data = await res.json();
      console.log(data);

      if (data.message === "test") {
        setIsValidToken(false);
      }
      if (data.message === "valid cookie") {
        setIsValidToken(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading to false after the check
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isValidToken) {
      // window.location.href = "http://localhost:5173/home";
      // window.location.href = "https://chordify.onrender.com/home";
      window.location.href = `${goToURL}/home`;
    }
  }, [isValidToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isValidToken) return null;

  return <>{children}</>;
}
