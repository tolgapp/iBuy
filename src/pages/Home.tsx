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
      <div className="text-4xl flex items-center justify-center font-bold sm:text-[9rem] sm:font-semibold w-full bg-black text-white p-18">
        We have them all!
      </div>
      {imageTextComponents}
    </main>
  );
};

export default Home;
