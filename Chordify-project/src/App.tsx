import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import SearchPage from "./pages/VisualAidsPage";
import NotFound from "./pages/NotFoundPage";
import SongLibraryPage from "./pages/SongLibraryPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/users/signup" element={<SignUpPage />} />

        <Route path="/users/login" element={<Login />} />

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
