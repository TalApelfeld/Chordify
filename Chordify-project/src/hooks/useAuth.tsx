import { useEffect, useState } from "react";

interface UserProps {
  name?: string;
  email?: string;
  role?: string;
  _id?: string;
  _v?: number;
}

const serverUrl = import.meta.env.VITE_SERVER_URL;

export default function useAuth() {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading state

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${serverUrl}/users/checkauth`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok)
          throw new Error(
            "Authentication failed there is no user (no cookie) you need to login!"
          );

        const data = await res.json();

        setUser(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Set loading to false after the check
      }
    }
    checkAuth();
  }, []);

  return { user, isLoading }; // Return both user and isLoading state
}
