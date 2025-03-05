import { ReactNode, useEffect, useState } from "react";

let serverURL: string = "";
let toURLpage = "";

if (window.location.href === "http://localhost:5173/home") {
  serverURL = "http://localhost:3000";
  toURLpage = "http://localhost:5173/login";
}
if (window.location.href === "http://10.0.0.16:5173/home") {
  serverURL = "http://10.0.0.16:3000";
  toURLpage = "http://10.0.0.16:5173/login";
}
if (window.location.href === "https://chordify.onrender.com") {
  serverURL = "https://chordify-api.onrender.com";
  toURLpage = "https://chordify.onrender.com/login";
}
console.log(serverURL);

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  async function checkAuth() {
    try {
      const res = await fetch(`${serverURL}/users/checkcookielogin`, {
        method: "GET",
        credentials: "include",
      });

      console.log(res.headers.get("content-type"));

      const data = await res.json();
      console.log(data);

      if (data.message === "valid cookie") {
        setIsValidToken(true);
      }
      if (data.message === "test") {
        setIsValidToken(false);
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
    if (isValidToken === false) {
      // window.location.href = toURLpage;
      window.location.href = toURLpage;
    }
  }, [isValidToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isValidToken === false) return null;

  return <>{children}</>;
}
