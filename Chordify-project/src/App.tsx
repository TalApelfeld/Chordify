import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import SongLibraryPage from "./pages/SongLibraryPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import LoginProtectedRoute from "./pages/LoginProtectedRoute";
import useAuth from "./hooks/useAuth"; // Assuming you have a useAuth hook
import VisualAidsPage from "./pages/VisualAidsPage";

function App() {
  const { user } = useAuth(); // Assuming useAuth returns { user, isLoading }
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
      console.log(user);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={
            <LoginProtectedRoute>
              <SignUpPage />
            </LoginProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <LoginProtectedRoute>
              <Login />
            </LoginProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/songlibrary"
          element={
            <ProtectedRoute>
              <SongLibraryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/visualaids"
          element={
            <ProtectedRoute>
              <VisualAidsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
