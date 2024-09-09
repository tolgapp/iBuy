import imagesData from "../data/images.json";
import Slides from "../components/Slides";
import ImageText from "../components/ImageText";
import imageAndText from "../data/imageandtext.json";
import ProductCard from "../components/ProductCard";
import products from "../data/products.json"
import "../index.css";

const Home = () => {
  const imageTextComponents = imageAndText.products.map((product, index) => {
    const isReverse = index % 2 !== 0;
    const className = isReverse ? "reverse" : "";

    return (
      <ImageText
        key={index}
        product={product}
        reverse={className}
      />
    );
  });

  return (
    <main className="home-container">
      <Slides images={imagesData.images} interval={5000} />
      <div className="product-container">
        {products.map(product => <ProductCard product={product} />)}
      </div>
      {imageTextComponents}
    </main>
  );
};

export default Home;