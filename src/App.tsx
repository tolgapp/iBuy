import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import "./index.css";
import NewsBar from "./components/NewsBar";
import { useState } from "react";

const App: React.FC = () => {
  const [closeNews, setCloseNews] = useState(true);

  function handleClick() {
    setCloseNews(false);
  }

  return (
    <>
      {closeNews ? <NewsBar handleClick={handleClick} />  : ""}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Shop />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
