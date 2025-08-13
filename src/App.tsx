import "./index.css";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import NewsBar from "./components/NewsBar";
import Home from "./pages/Home";
import Search from "./components/Search";
import Signup from "./components/Signup";
import UpdateProfile from "./components/UpdateProfile";
import Login from "./components/Login";
import Favorites from "./pages/Favorites";
import ProductDetail from "./components/ProductDetail";
import SearchResults from "./components/SearchResults";
import BackToTop from "./components/BackToTop";
import ScreenSizeWarning from "./components/ScreenSizeWarning";
import { Analytics } from "@vercel/analytics/react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "./services/products";
import { setProducts } from "./store/reducers/productReducer";
import { RootState } from "./store/store";
import Cart from "./pages/Cart";

const App: React.FC = () => {
  const [closeNews, setCloseNews] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dispatch = useDispatch();
  const { userId, isLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", userId);
    }
  }, [isLoggedIn, userId]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        dispatch(setProducts(data));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    if (storedFavorites.length > 0) {
      setFavoriteProducts(storedFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteProducts));
  }, [favoriteProducts]);

  function handleClick() {
    setCloseNews(!closeNews);
  }

  function showSearch() {
    setIsSearchVisible((prev) => !prev);
  }

  const toggleFavorite = (productId: number) => {
    setFavoriteProducts((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId]
    );
  };

  return (
    <>
      <Analytics />
      {!closeNews && <NewsBar handleClick={handleClick} />}
      {isSearchVisible && (
        <Search
          showSearch={showSearch}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />
      )}
      <Navbar showSearch={showSearch} closeNews={closeNews} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              favoriteProducts={favoriteProducts}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/shop"
          element={
            <Shop
              favoriteProducts={favoriteProducts}
              onToggleFavorite={toggleFavorite}
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
              />
            ) : (
              <Signup />
            )
          }
        />
        <Route
          path="/signup"
          element={userId ? <UpdateProfile /> : <Signup />}
        />
        <Route
          path="/login"
          element={userId ? <Navigate to={"/"} replace /> : <Login />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/update-profile"
          element={userId ? <UpdateProfile /> : <Navigate to="/" replace />}
        />
        <Route
          path="/search"
          element={
            <SearchResults
              searchQuery={searchQuery}
              onToggleFavorite={toggleFavorite}
              favoriteProducts={favoriteProducts}
            />
          }
        />
      </Routes>
      <Footer />
      <BackToTop />
      <ScreenSizeWarning />
    </>
  );
};

export default App;
