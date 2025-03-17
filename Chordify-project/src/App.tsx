import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import SongLibraryPage from "./pages/SongLibraryPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import LoginProtectedRoute from "./pages/LoginProtectedRoute";
import VisualAidsPage from "./pages/VisualAidsPage";

function App() {
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
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
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
