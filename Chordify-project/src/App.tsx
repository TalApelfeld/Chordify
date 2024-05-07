import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        {/* //* " * "" for route that dont match  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
