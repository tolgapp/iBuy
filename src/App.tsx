// App.tsx
import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import NewsBar from "./components/NewsBar";
import Search from "./components/Search";
import Signup from "./components/Signup";
import UpdateProfile from "./components/UpdateProfile";
import Login from "./components/Login";
import "./index.css";

const App: React.FC = () => {
  const [closeNews, setCloseNews] = useState(true);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  const navigate = useNavigate();

  function handleClick() {
    setCloseNews(false);
  }

  function showSearch() {
    setIsSearchVisible((prev) => !prev);
  }

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUserId(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      {closeNews && <NewsBar handleClick={handleClick} />}
      {isSearchVisible && <Search showSearch={showSearch} />}
      <Navbar showSearch={showSearch} isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route
          path="/favorites"
          element={
            <Signup setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/update-profile" replace />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />
            )
          }
        />
        <Route
          path="/update-profile"
          element={
            userId ? (
              <UpdateProfile userId={userId} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
