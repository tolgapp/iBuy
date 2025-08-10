import imagesData from "../data/images.json";
import Slides from "../components/Slider";
import ImageText from "../components/ImageText";
import imageAndText from "../data/imageandtext.json";
import ProductCard from "../components/ProductCard";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import "../index.css";

type HomeProps = {
  favoriteProducts: number[];
  onToggleFavorite: (productId: number) => void;
};

const Home: React.FC<HomeProps> = ({ favoriteProducts, onToggleFavorite }) => {
  const products = useSelector((state: RootState) => state.products);

  const imageTextComponents = imageAndText.products.map((product, index) => {
    const isReverse = index % 2 !== 0;
    return <ImageText key={index} product={product} reverse={isReverse} />;
  });

  const displayedProducts =
    location.pathname === "/" ? products.slice(0, 6) : products;

  return (
    <main className="relative bg-white">
      <Slides images={imagesData.images} interval={5000} />
      <div className="flex overflow-x-scroll whitespace-nowrap justify-start items-center no-scrollbar">
        <div className="p-6 flex gap-2">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favoriteProducts.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </div>
      <h3 className="text-4xl font-bold sm:text-[6rem] sm:font-semibold text-center my-8 font-sans">
        We have them all!
      </h3>{" "}
      {imageTextComponents}
    </main>
  );
};

export default Home;
