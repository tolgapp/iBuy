import imagesData from "../data/images.json";
import Slides from "../components/Slides";
import ImageText from "../components/ImageText";
import imageAndText from "../data/imageandtext.json";
import ProductCard from "../components/ProductCard";
import products from "../data/products.json";
import "../index.css";

type HomeProps = {
  favoriteProducts: number[];
  isLoggedIn: boolean;
  onToggleFavorite: (productId: number) => void;
};

const Home: React.FC<HomeProps> = ({
  favoriteProducts,
  onToggleFavorite,
  isLoggedIn,
}) => {
  
  const imageTextComponents = imageAndText.products.map((product, index) => {
    const isReverse = index % 2 !== 0;
    return <ImageText key={index} product={product} reverse={isReverse} />;
  });

  const displayedProducts =
    location.pathname === "/" ? products.slice(0, 6) : products;

  return (
    <main className="home-container">
      <Slides images={imagesData.images} interval={5000} />
      <div className="product-container">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favoriteProducts.includes(product.id)}
            onToggleFavorite={onToggleFavorite}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
      <h3 className="all">We have them all!</h3>
      {imageTextComponents}
    </main>
  );
};

export default Home;
