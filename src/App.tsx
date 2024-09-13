import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import NewsBar from "./components/NewsBar";
import Search from "./components/Search";
import Signup from "./components/Signup";
import "./index.css";
import Login from "./components/Login";

const App: React.FC = () => {
  const [closeNews, setCloseNews] = useState(true);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  function handleClick() {
    setCloseNews(false);
  }

  function showSearch() {
    setIsSearchVisible((prev) => !prev);
  }

  // TODO: useContext for global Search
  // TODO: Input (Search Component) adjust text position

  return (
    <>
      {closeNews ? <NewsBar handleClick={handleClick} /> : ""}
      {isSearchVisible ? <Search showSearch={showSearch} /> : ""}
      <Navbar showSearch={showSearch} />    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        {/* <Route path="/shop/:id" element={<ShopDetail shopID={}/>} /> */}
        {/* Redirect to Signup -> Signup instead of Favorites*/}
        <Route path="/favorites" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
