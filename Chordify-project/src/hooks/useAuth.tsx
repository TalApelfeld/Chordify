// import { useEffect, useState } from "react";

// let serverURL: string = "";

// if (window.location.href === "http://localhost:5173/login") {
//   serverURL = "http://localhost:3000";
// }
// if (window.location.href === "http://10.0.0.16:5173/login") {
//   serverURL = "http://10.0.0.16:3000";
// }
// console.log(serverURL);

// export default function useAuth() {
//   const [isValidToken, setIsValidToken] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function checkAuth() {
//       try {
//         const res = await fetch(`${serverURL}/users/checkcookielogin`, {
//           method: "GET",
//           credentials: "include",
//         });

//         console.log("req been sent");
//         console.log(res);

//         const data = await res.json();
//         console.log(data);

//         if (data.message === "test") {
//           setIsValidToken(true);
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     checkAuth();
//   }, []);

//   return { isValidToken, isLoading };
// }
