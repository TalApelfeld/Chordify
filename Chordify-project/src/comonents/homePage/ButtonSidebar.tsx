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
  async function logout() {
    try {
      const response = await fetch(`${serverUrl}/users/logout`, {
        // Adjust the API endpoint as needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies with the request
      });

      if (!response.ok) {
        throw new Error("Something went wrong with the logout");
      }

      const data = await response.json();

      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Link to={path}>
      <li>
        <button
          className={`${classStyle} hover:bg-background-black hover:rounded-full`}
          onClick={() => {
            if (name === "Logout") logout();
          }}
        >
          {children}
          {name}
        </button>
      </li>
    </Link>
  );
}
