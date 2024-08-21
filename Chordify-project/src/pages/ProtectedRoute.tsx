// import { ReactNode, useEffect, useState } from "react";

// import { useNavigate } from "react-router-dom";

// import Login from "./LoginPage";

// interface UserProps {
//   email: string | null;
//   role: string | null;
//   _id: string | null;
//   _v: number | null;
// }

// interface ProtectedRouteProps {
//   children: ReactNode; // Typing children as ReactNode
// }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const [user, setUser] = useState<UserProps | null>(null);
//   const navigate = useNavigate(); // useNavigate for redirection

//   useEffect(() => {
//     async function checkAuth() {
//       try {
//         const res = await fetch("http://localhost:3000/users/checkauth", {
//           // Adjust the API endpoint as needed
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include", // Include cookies with the request
//         });

//         const data: UserProps = await res.json();

//         console.log(data);

//         setUser(data);

//         if (!res.ok) new Error("you are not Authenticated pls login BITCH");
//       } catch (error) {
//         console.log(error);
//         navigate("/login");
//       }
//     }
//     checkAuth();
//   }, [navigate]);

//   useEffect(() => {
//     // Redirect if the user state is set but user.email is null
//     if (user && !user.email) {
//       navigate("/login");
//     }
//   }, [user, navigate]);

//   return user && user.email ? (
//     <>
//       {children}
//       {console.log(user)}
//     </>
//   ) : (
//     <Login />
//   );
// }

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

const serverUrl = import.meta.env.VITE_SERVER_URL;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

        if (!res.ok) throw new Error("Authentication failed");

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

  return user?.data && user.data.email ? <>{children}</> : null;
}
