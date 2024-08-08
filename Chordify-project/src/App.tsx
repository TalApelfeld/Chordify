import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import SearchPage from "./pages/VisualAidsPage";
import NotFound from "./pages/NotFoundPage";
import SongLibraryPage from "./pages/SongLibraryPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/songlibrary" element={<SongLibraryPage />} />

        <Route path="/visualaids" element={<SearchPage />} />
        {/* //* " * "" for route that dont match  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
