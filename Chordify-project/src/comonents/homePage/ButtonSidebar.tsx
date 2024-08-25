import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ButtonSidebarProps {
  children?: React.ReactNode; // Explicitly typing children
  name: string;
  classStyle: string;
  path: string;
}

const serverUrl = import.meta.env.VITE_SERVER_URL;
export default function ButtonSidebar({
  children,
  name,
  classStyle,
  path,
}: ButtonSidebarProps) {
  const [flag, setFlag] = useState<boolean>(false);

  async function logout() {
    try {
      const response = await fetch(`${serverUrl}/users/logout`, {
        // Adjust the API endpoint as needed
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies with the request
      });

      if (!response.ok) {
        throw new Error("Something went wrong with the logout");
      }

      const data = await response.json();
      setFlag(true);
      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log("page refreshed ! after logging out");
  }, [flag]);

  return (
    <Link to={path}>
      <li>
        <button
          className={`${classStyle} hover:bg-background-black hover:rounded-full`}
          onClick={() => {
            logout();
          }}
        >
          {children}
          {name}
        </button>
      </li>
    </Link>
  );
}
