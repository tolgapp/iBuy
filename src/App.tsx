import { useEffect, useState } from "react";
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
import Favorites from "./pages/Favorites";
import "./index.css";
import ProductDetail from "./components/ProductDetail";
import SearchResults from "./components/SearchResults"; // Importiere die Suchergebnisse

const App: React.FC = () => {
  const [closeNews, setCloseNews] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [favoriteProducts, setFavoriteProducts] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate();

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    if (storedUserId) {
      setUserId(storedUserId);
      setIsLoggedIn(true);
    }

    if (storedFavorites.length > 0) {
      setFavoriteProducts(storedFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteProducts));
  }, [favoriteProducts]);

  function handleClick() {
    setCloseNews(true);
  }

  function showSearch() {
    setIsSearchVisible((prev) => !prev);
  }

  const handleLogout = () => {
    localStorage.clear();
    setFavoriteProducts([]);
    setUserId(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleFavorite = (productId: number) => {
    setFavoriteProducts((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId]
    );
  };

  return (
    <>
      {!closeNews && <NewsBar handleClick={handleClick} />}
      {isSearchVisible && (
        <Search
          showSearch={showSearch}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />
      )}
      <Navbar showSearch={showSearch} isLoggedIn={isLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              favoriteProducts={favoriteProducts}
              onToggleFavorite={toggleFavorite}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/shop"
          element={
            <Shop
              favoriteProducts={favoriteProducts}
              onToggleFavorite={toggleFavorite}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route path="/shop/:id" element={<ProductDetail />} />
        <Route
          path="/favorites"
          element={
            userId ? (
              <Favorites
                favoriteProducts={favoriteProducts}
                onToggleFavorite={toggleFavorite}
                isLoggedIn={isLoggedIn}
              />
            ) : (
              <Signup setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            userId ? (
              <UpdateProfile userId={userId} onLogout={handleLogout} />
            ) : (
              <Signup setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />
            )
          }
        />
        <Route
          path="/login"
          element={
            userId ? (
              <Navigate to={"/"} replace />
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
        <Route
          path="/search"
          element={
            <SearchResults
              searchQuery={searchQuery}
              onToggleFavorite={toggleFavorite}
              isLoggedIn={isLoggedIn}
              favoriteProducts={favoriteProducts}
            />
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
