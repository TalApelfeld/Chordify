import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import SearchPage from "./pages/VisualAidsPage";
import NotFound from "./pages/NotFoundPage";
import SongLibraryPage from "./pages/SongLibraryPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import LoginProtectedRoute from "./pages/LoginProtectedRoute";

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
