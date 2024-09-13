import imagesData from "../data/images.json";
import Slides from "../components/Slides";
import ImageText from "../components/ImageText";
import imageAndText from "../data/imageandtext.json";
import ProductCard from "../components/ProductCard";
import products from "../data/products.json";
import BackToTop from "../components/BackToTop";
import "../index.css";
import { useLocation } from "react-router-dom";

const Home = () => {
  const imageTextComponents = imageAndText.products.map((product, index) => {
    const isReverse = index % 2 !== 0;

    return (
      <ImageText
        key={index}
        product={product}
        reverse={isReverse}
      />
    );
  });

  const displayedProducts =
    location.pathname === "/" ? products.slice(0, 6) : products;


  return (
    <main className="home-container">
      <Slides images={imagesData.images} interval={5000} />
      <div className="product-container">
        {displayedProducts.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
        <h3 className="all">We have them all!</h3>
      {imageTextComponents}
      <BackToTop />
    </main>
  );
};

export default Home;
