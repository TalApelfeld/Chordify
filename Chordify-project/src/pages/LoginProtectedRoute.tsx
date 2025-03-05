import { ReactNode, useEffect, useState } from "react";

let serverURL: string = "";
let toURLPage = "";

if (window.location.href === "http://localhost:5173/signup") {
  serverURL = "http://localhost:3000";
  toURLPage = "http://localhost:5173/home";
}
if (window.location.href === "http://localhost:5173/login") {
  serverURL = "http://localhost:3000";
  toURLPage = "http://localhost:5173/home";
}
if (window.location.href === "http://10.0.0.16:5173/login") {
  serverURL = "http://10.0.0.16:3000";
  toURLPage = "http://10.0.0.16:5173/home";
}
if (window.location.href === "http://10.0.0.16:5173/signup") {
  serverURL = "http://10.0.0.16:3000";
  toURLPage = "http://10.0.0.16:5173/home";
}
if (window.location.href === "https://chordify.onrender.com") {
  serverURL = "https://chordify-api.onrender.com";
  toURLPage = "https://chordify.onrender.com/home";
}
console.log(serverURL);

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
      window.location.href = toURLPage;
    }
  }, [isValidToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isValidToken) return null;

  return <>{children}</>;
}
