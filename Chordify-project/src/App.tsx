import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import SearchPage from "./pages/VisualAidsPage";
import NotFound from "./pages/NotFoundPage";
import SongLibraryPage from "./pages/SongLibraryPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        {/* Redirect root to /login */}
        <Route path="/" element={<>{navigate("/login")}</>} />

        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/login" element={<Login />} />

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
              <SearchPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
